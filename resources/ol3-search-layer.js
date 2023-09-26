function hasClass(el, cls) {
    return (
        el.className &&
        new RegExp('(\\s|^)' + cls + '(\\s|$)').test(el.className)
    );
}

function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

var SearchLayer = (function (Control) {
    function SearchLayer(optOptions) {
        var horseyComponent;
        var select;
        var options = optOptions || {};
        if (optOptions.layer) {
            options.layer = optOptions.layer;
        } else {
            throw new Error('error');
        }
        options.map = optOptions.map;

        var source;
        if (
            options.layer instanceof ol.layer.Image &&
            options.layer.getSource() instanceof ol.source.ImageVector
        ) {
            source = options.layer.getSource().getSource();
        } else if (options.layer instanceof ol.layer.Vector) {
            source = options.layer.getSource();
        }
        options.colName = optOptions.colName;

        var button = document.createElement('button');
        var toogleHideShowInput = function () {
            var input = document.querySelector(
                'form > .search-layer-input-search',
            );
            if (hasClass(input, 'search-layer-collapsed')) {
                removeClass(input, 'search-layer-collapsed');
            } else {
                input.value = '';
                addClass(input, 'search-layer-collapsed');
                horseyComponent.hide();
                select.getFeatures().clear();
            }
        };

        button.addEventListener('click', toogleHideShowInput, false);
        button.addEventListener('touchstart', toogleHideShowInput, false);

        var form = document.createElement('form');
        form.setAttribute('id', 'random');
        form.onsubmit = undefined;
        // form.setAttribute('action', 'javascript:void(0);');

        var input = document.createElement('input');
        input.setAttribute('id', 'ol-search-input');
        var defaultInputClass = ['search-layer-input-search'];
        if (optOptions.collapsed) {
            defaultInputClass.push('search-layer-collapsed');
        }
        input.setAttribute('class', defaultInputClass.join(' '));
        input.setAttribute('placeholder', 'Bạn muốn tra cứu thông tin gì ...');
        input.setAttribute('type', 'text');

        form.appendChild(input);

        var element = document.createElement('div');
        element.className = 'search-layer ol-unselectable ol-control';

        element.appendChild(button);
        element.appendChild(form);

        ol.control.Control.call(this, {
            element: element,
            target: options.target,
        });

        var selectedStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red', // Màu viền của đối tượng đã chọn
                width: 4 // Độ rộng của viền
            }),
            fill: new ol.style.Fill({
                color: 'transparent' // Màu nền của đối tượng đã chọn
            })
        });
        select = new ol.interaction.Select({
            id: options.selectId || 'defaultSearchLayer',
            layers: [options.layer],
            condition: ol.events.condition.never,
            style: selectedStyle // Gán style cho các đối tượng đã chọn
        });

        var map = options.map;

        map.addInteraction(select);

        var typesToZoomToExtent = [
            'MultiPoint',
            'LineString',
            'MultiLineString',
            'MultiPolygon',
            'Polygon',
        ];

        var typesToZoomToCenterAndZoom = ['Point'];
        var returnHorsey = function (input, source, map, select, options) {
            horsey(input, {
                source: [
                    {
                        list: source.getFeatures().map(function (el, i) {
                            if (el.getId() === undefined) {
                                el.setId(i);
                            }
                            return {
                                text: el.get(options.colName),
                                value: el.getId(), // If GeoJSON has an id
                                feature: el, // Lưu tham chiếu đến đối tượng
                            };
                        }),
                    },
                ],
                getText: 'text',
                getValue: 'value',
                predictNextSearch: function (info) {
                    var feat = source.getFeatureById(info.selection.value);
                    var featType = feat.getGeometry().getType();
                     // Đặt tọa độ trung tâm của map view bằng tọa độ của đối tượng
                    var center = feat.getGeometry().getCoordinates();       
                    if (typesToZoomToCenterAndZoom.indexOf(featType) !== -1) {
                        var newCenter = ol.extent.getCenter(
                            feat.getGeometry().getExtent(),
                        );
                        map.getView().setCenter(newCenter);
                        map.getView().setZoom(parseInt(options.zoom )|| 12); // chỉnh sửa mức zoom 
                    } else if (typesToZoomToExtent.indexOf(featType) !== -1) 
                    {
                        var extent = feat.getGeometry().getExtent();
                        var size = map.getSize();
                        var newExtent = ol.extent.buffer(extent, 300); // Tăng kích thước phạm vi
                        map.getView().fit(newExtent, size);
                    }
                    // Lấy thông tin đối tượng
                    
                    onSelectObjectFromSearch(info.selection.feature);

                    select.getFeatures().clear();
                    select.getFeatures().push(feat);
                    
                },
            });
        };
        if (source.getState() === 'ready') {
            horseyComponent = returnHorsey(input, source, map, select, options);
        }
        source.once('change', function (e) {
            if (source.getState() === 'ready') {
                horseyComponent = returnHorsey(
                    input,
                    source,
                    map,
                    select,
                    options,
                );
            }
        });
    }
    if (Control) SearchLayer.__proto__ = Control;
    SearchLayer.prototype = Object.create(Control && Control.prototype);
    SearchLayer.prototype.constructor = SearchLayer;
    return SearchLayer;
})(ol.control.Control);

// Hàm xử lý khi chọn đối tượng từ ô tìm kiếm và hiển thị thông tin trong bảng
var onSelectObjectFromSearch = function (feature) {
    // Lấy thông tin của đối tượng
    var featureProperties = feature.getProperties();
    // Xóa thuộc tính đầu tiên (nếu có)
    var firstProperty = Object.keys(featureProperties)[0];
    if (firstProperty) {
        delete featureProperties[firstProperty];
    }


    // Lấy tham chiếu đến bảng
    var table = document.getElementById('info-table');

    // Xóa tất cả các dòng hiện có trong bảng, trừ dòng tiêu đề (nếu có)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Tạo một dòng mới cho mỗi thuộc tính của đối tượng và hiển thị nó trong bảng
    for (var key in featureProperties) {
        var value = featureProperties[key];
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = key; // Tên thuộc tính
        cell2.innerHTML = value; // Giá trị thuộc tính
    }
};