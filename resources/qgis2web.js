var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var sketch;

closer.onclick = function () {
    container.style.display = 'none';
    closer.blur();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container,
});

var expandedAttribution = new ol.control.Attribution({
    collapsible: false,
});

var map = new ol.Map({
    controls: ol.control
        .defaults({ attribution: false })
        .extend([expandedAttribution]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    overlays: [overlayPopup],
    layers: layersList,
    view: new ol.View({
        maxZoom: 28,
        minZoom: 1,
    }),
});

var layerSwitcher = new ol.control.LayerSwitcher({ tipLabel: 'Layers' });
map.addControl(layerSwitcher);

var searchLayer = new SearchLayer({
    layer: lyr_CMB_CangHaiPhong_BenCang_7,
    colName: 'ten',
    zoom: 5,
    collapsed: true,
    map: map,
});

map.addControl(searchLayer);
document
    .getElementsByClassName('search-layer')[0]
    .getElementsByTagName('button')[0].className += ' fa fa-binoculars';// Kiểu style nút tìm kiếm

map.getView().fit(
    [11835447.077932, 2311240.046734, 11980879.367584, 2412505.809271],
    map.getSize(),
);

var NO_POPUP = 0;
var ALL_FIELDS = 1;



/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx =
        layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false, // optional, might improve performance
    }),
    style: [
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#ffff00',
                width: 4,
            }),
            fill: new ol.style.Fill({
                color: 'transparent',
            }),
        }),
    ],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true, // optional, for instant visual feedback
});

var doHighlight = true;
var doHover = true;

var highlight;
var autolinker = new Autolinker({
    truncate: { length: 30, location: 'smart' },
});
var onSingleClick = function (evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
    map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        // We only care about features from layers in the layersList, ignore
        // any other layers which the map might contain such as the vector
        // layer used by the measure tool
        if (layersList.indexOf(layer) === -1) {
            return;
        }
        var doPopup = false;
        for (k in layer.get('fieldImages')) {
            if (layer.get('fieldImages')[k] != 'Hidden') {
                doPopup = true;
            }
        }
        currentFeature = feature;
        currentLayer = layer;
        clusteredFeatures = feature.get('features');
        var clusterFeature;
        if (typeof clusteredFeatures !== 'undefined') {
            if (doPopup) {
                for (var n = 0; n < clusteredFeatures.length; n++) {
                    clusterFeature = clusteredFeatures[n];
                    currentFeatureKeys = clusterFeature.getKeys();
                    popupText += '<li><table>';
                    for (var i = 0; i < currentFeatureKeys.length; i++) {
                        if (currentFeatureKeys[i] != 'geometry') {
                            popupField = '';
                            if (
                                layer.get('fieldLabels')[
                                    currentFeatureKeys[i]
                                ] == 'inline label'
                            ) {
                                popupField +=
                                    '<th>' +
                                    layer.get('fieldAliases')[
                                        currentFeatureKeys[i]
                                    ] +
                                    ':</th><td>';
                            } else {
                                popupField += '<td colspan="2">';
                            }
                            if (
                                layer.get('fieldLabels')[
                                    currentFeatureKeys[i]
                                ] == 'header label'
                            ) {
                                popupField +=
                                    '<strong>' +
                                    layer.get('fieldAliases')[
                                        currentFeatureKeys[i]
                                    ] +
                                    ':</strong><br />';
                            }
                            if (
                                layer.get('fieldImages')[
                                    currentFeatureKeys[i]
                                ] != 'ExternalResource'
                            ) {
                                popupField +=
                                    clusterFeature.get(currentFeatureKeys[i]) !=
                                    null
                                        ? autolinker.link(
                                              clusterFeature
                                                  .get(currentFeatureKeys[i])
                                                  .toLocaleString(),
                                          ) + '</td>'
                                        : '';
                            } else {
                                popupField +=
                                    clusterFeature.get(currentFeatureKeys[i]) !=
                                    null
                                        ? '<img src="images/' +
                                          clusterFeature
                                              .get(currentFeatureKeys[i])
                                              .replace(/[\\\/:]/g, '_')
                                              .trim() +
                                          '" /></td>'
                                        : '';
                            }
                            popupText += '<tr>' + popupField + '</tr>';
                        }
                    }
                    popupText += '</table></li>';
                }
            }
        } else {
            currentFeatureKeys = currentFeature.getKeys();
            if (doPopup) {
                popupText += '<li><table>';
                for (var i = 0; i < currentFeatureKeys.length; i++) {
                    if (currentFeatureKeys[i] != 'geometry') {
                        popupField = '';
                        if (
                            layer.get('fieldLabels')[currentFeatureKeys[i]] ==
                            'inline label'
                        ) {
                            popupField +=
                                '<th>' +
                                layer.get('fieldAliases')[
                                    currentFeatureKeys[i]
                                ] +
                                ':</th><td>';
                        } else {
                            popupField += '<td colspan="2">';
                        }
                        if (
                            layer.get('fieldLabels')[currentFeatureKeys[i]] ==
                            'header label'
                        ) {
                            popupField +=
                                '<strong>' +
                                layer.get('fieldAliases')[
                                    currentFeatureKeys[i]
                                ] +
                                ':</strong><br />';
                        }
                        if (
                            layer.get('fieldImages')[currentFeatureKeys[i]] !=
                            'ExternalResource'
                        ) {
                            popupField +=
                                currentFeature.get(currentFeatureKeys[i]) !=
                                null
                                    ? autolinker.link(
                                          currentFeature
                                              .get(currentFeatureKeys[i])
                                              .toLocaleString(),
                                      ) + '</td>'
                                    : '';
                        } else {
                            popupField +=
                                currentFeature.get(currentFeatureKeys[i]) !=
                                null
                                    ? '<img src="images/' +
                                      currentFeature
                                          .get(currentFeatureKeys[i])
                                          .replace(/[\\\/:]/g, '_')
                                          .trim() +
                                      '" /></td>'
                                    : '';
                        }
                        popupText += '<tr>' + popupField + '</tr>';
                    }
                }
                popupText += '</table></li>';
            }
        }
    });
    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }

    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                // Tạo một hiệu ứng thay đổi màu sắc khi di chuột vào đối tượng
                var styleDefinition = currentLayer.getStyle().toString();

                if (currentFeature.getGeometry().getType() == 'Point') {
                    var radius = styleDefinition
                        .split('radius')[1]
                        .split(' ')[1];

                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: 'transparent', // Đổi màu sắc tại đây
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#ffff00', // Màu viền
                                width: 2, // Độ rộng của viền
                            }),
                            radius: radius,
                        }),
                    });
                } else if (
                    currentFeature.getGeometry().getType() == 'LineString'
                ) {
                    var featureWidth = styleDefinition
                        .split('width')[1]
                        .split(' ')[1]
                        .replace('})', '');

                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'transparent', // Đổi màu sắc tại đây
                            lineDash: null,
                            width: featureWidth,
                        }),
                    });
                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'transparent', // Đổi màu sắc tại đây
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#ffff00', // Màu viền
                            width: 2, // Độ rộng của viền
                        }),
                    });
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }
    /*
    //Hiện Popup khi hover chuột
    if (doHover) {
        if (popupText) {
            overlayPopup.setPosition(coord);
            content.innerHTML = popupText;
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
            closer.blur();
        }
    }
    */
};

var onSingleClick = function (evt) {
   
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var currentFeature;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
    map.forEachFeatureAtPixel(pixel, function (feature, layer) {
         // We only care about features from layers in the layersList, ignore
        // any other layers which the map might contain such as the vector
        // layer used by the measure tool
        if (layersList.indexOf(layer) === -1) {
            return;
        }
        var doPopup = false;
        for (k in layer.get('fieldImages')) {
            if (layer.get('fieldImages')[k] != 'Hidden') {
                doPopup = true;
            }
        }
        currentFeature = feature;
        currentLayer = layer;
        clusteredFeatures = feature.get('features');
        var clusterFeature;
        if (typeof clusteredFeatures !== 'undefined') {
            if (doPopup) {
                for (var n = 0; n < clusteredFeatures.length; n++) {
                    clusterFeature = clusteredFeatures[n];
                    currentFeatureKeys = clusterFeature.getKeys();
                    popupText += '<li><table>';
                    for (var i = 0; i < currentFeatureKeys.length; i++) {
                        if (currentFeatureKeys[i] != 'geometry') {
                            popupField = '';
                            if (
                                layer.get('fieldLabels')[
                                    currentFeatureKeys[i]
                                ] == 'inline label'
                            ) {
                                popupField +=
                                    '<th>' +
                                    layer.get('fieldAliases')[
                                        currentFeatureKeys[i]
                                    ] +
                                    ':</th><td>';
                            } else {
                                popupField += '<td colspan="2">';
                            }
                            if (
                                layer.get('fieldLabels')[
                                    currentFeatureKeys[i]
                                ] == 'header label'
                            ) {
                                popupField +=
                                    '<strong>' +
                                    layer.get('fieldAliases')[
                                        currentFeatureKeys[i]
                                    ] +
                                    ':</strong><br />';
                            }
                            if (
                                layer.get('fieldImages')[
                                    currentFeatureKeys[i]
                                ] != 'ExternalResource'
                            ) {
                                popupField +=
                                    clusterFeature.get(currentFeatureKeys[i]) !=
                                    null
                                        ? autolinker.link(
                                              clusterFeature
                                                  .get(currentFeatureKeys[i])
                                                  .toLocaleString(),
                                          ) + '</td>'
                                        : '';
                            } else {
                                popupField +=
                                    clusterFeature.get(currentFeatureKeys[i]) !=
                                    null
                                        ? '<img src="images/' +
                                          clusterFeature
                                              .get(currentFeatureKeys[i])
                                              .replace(/[\\\/:]/g, '_')
                                              .trim() +
                                          '" /></td>'
                                        : '';
                            }
                            popupText += '<tr>' + popupField + '</tr>';
                        }
                    }
                    popupText += '</table></li>';
                }
            }
        } else {
            currentFeatureKeys = currentFeature.getKeys();
            if (doPopup) {
                popupText += '<li><table>';
                for (var i = 0; i < currentFeatureKeys.length; i++) {
                    if (currentFeatureKeys[i] != 'geometry') {
                        popupField = '';
                        if (
                            layer.get('fieldLabels')[currentFeatureKeys[i]] ==
                            'inline label'
                        ) {
                            popupField +=
                                '<th>' +
                                layer.get('fieldAliases')[
                                    currentFeatureKeys[i]
                                ] +
                                ':</th><td>';
                        } else {
                            popupField += '<td colspan="2">';
                        }
                        if (
                            layer.get('fieldLabels')[currentFeatureKeys[i]] ==
                            'header label'
                        ) {
                            popupField +=
                                '<strong>' +
                                layer.get('fieldAliases')[
                                    currentFeatureKeys[i]
                                ] +
                                ':</strong><br />';
                        }
                        if (
                            layer.get('fieldImages')[currentFeatureKeys[i]] !=
                            'ExternalResource'
                        ) {
                            popupField +=
                                currentFeature.get(currentFeatureKeys[i]) !=
                                null
                                    ? autolinker.link(
                                          currentFeature
                                              .get(currentFeatureKeys[i])
                                              .toLocaleString(),
                                      ) + '</td>'
                                    : '';
                        } else {
                            popupField +=
                                currentFeature.get(currentFeatureKeys[i]) !=
                                null
                                    ? '<img src="images/' +
                                      currentFeature
                                          .get(currentFeatureKeys[i])
                                          .replace(/[\\\/:]/g, '_')
                                          .trim() +
                                      '" /></td>'
                                    : '';
                        }
                        popupText += '<tr>' + popupField + '</tr>';
                    }
                }
                popupText += '</table></li>';
            }
        }
    });
    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }

    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                // Tạo một hiệu ứng thay đổi màu sắc khi di chuột vào đối tượng
                var styleDefinition = currentLayer.getStyle().toString();

                if (currentFeature.getGeometry().getType() == 'Point') {
                    var radius = styleDefinition
                        .split('radius')[1]
                        .split(' ')[1];

                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: 'transparent', // Đổi màu sắc tại đây
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#ffff00', // Màu viền
                                width: 2, // Độ rộng của viền
                            }),
                            radius: radius,
                        }),
                    });
                } else if (
                    currentFeature.getGeometry().getType() == 'LineString'
                ) {
                    var featureWidth = styleDefinition
                        .split('width')[1]
                        .split(' ')[1]
                        .replace('})', '');

                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'transparent', // Đổi màu sắc tại đây
                            lineDash: null,
                            width: featureWidth,
                        }),
                    });
                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'transparent', // Đổi màu sắc tại đây
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#ffff00', // Màu viền
                            width: 2, // Độ rộng của viền
                        }),
                    });
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }
    // Giả định dữ liệu từ popup
    //var popupText = "Phân loại: ABC<br>Tên: XYZ<br>"; // Điều này là một ví dụ, thay thế bằng dữ liệu thực tế từ popup
    // Loại bỏ dấu chấm (".") từ chuỗi HTML của popup
   
    // hiện PopUp
    if (popupText) {
        overlayPopup.setPosition(coord);
        content.innerHTML = popupText;
        container.style.display = 'block';
        //console.log(popupText);
        // Xóa tất cả các dòng hiện có trong bảng
        var table = document.getElementById('info-table');
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
        
        // Lấy thông tin từ popup và thêm vào bảng
        table.innerHTML = popupText;
        
    } else {
        container.style.display = 'none';
        closer.blur();
    }
    
};

map.on('singleclick', function (evt) {
    onSingleClick(evt);
});
map.on('singleclick', function (evt) {
    onClick(evt);
});



// Điều chỉnh vị trí của SearchLayer bằng JavaScript
var searchLayer = document.querySelector('.search-layer');
searchLayer.style.top = '0px'; // Đặt vị trí đứng
searchLayer.style.left = '0px'; // Đặt vị trí ngang
searchLayer.style.height = '40px';
//






