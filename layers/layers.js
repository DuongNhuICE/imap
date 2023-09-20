var wms_layers = [];

var lyr_GoogleSatelliteHybrid_0 = new ol.layer.Tile({
    title: 'Google Satellite Hybrid',
    type: 'base',
    opacity: 1.0,

    source: new ol.source.XYZ({
        attributions: ' ',
        url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    }),
});

var lyr_GoogleMaps_1 = new ol.layer.Tile({
    title: 'Google Maps',
    type: 'base',
    opacity: 1.0,

    source: new ol.source.XYZ({
        attributions: ' ',
        url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    }),
});
var format_CMB_PhaoBaoHieuTau_2 = new ol.format.GeoJSON();
var features_CMB_PhaoBaoHieuTau_2 = format_CMB_PhaoBaoHieuTau_2.readFeatures(
    json_CMB_PhaoBaoHieuTau_2,
    { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' },
);
var jsonSource_CMB_PhaoBaoHieuTau_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CMB_PhaoBaoHieuTau_2.addFeatures(features_CMB_PhaoBaoHieuTau_2);
var lyr_CMB_PhaoBaoHieuTau_2 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_CMB_PhaoBaoHieuTau_2,
    style: style_CMB_PhaoBaoHieuTau_2,
    interactive: true,
    title: 'CMB_PhaoBaoHieuTau<br />\
    <img src="styles/legend/CMB_PhaoBaoHieuTau_2_0.png" /> Phao Đỏ<br />\
    <img src="styles/legend/CMB_PhaoBaoHieuTau_2_1.png" /> Phao Trắng<br />\
    <img src="styles/legend/CMB_PhaoBaoHieuTau_2_2.png" /> Phao Vàng<br />\
    <img src="styles/legend/CMB_PhaoBaoHieuTau_2_3.png" /> Phao Xanh<br />\
    <img src="styles/legend/CMB_PhaoBaoHieuTau_2_4.png" /> <br />',
});
var format_CMB_VungNuocCangBienHaiPhong_3 = new ol.format.GeoJSON();
var features_CMB_VungNuocCangBienHaiPhong_3 =
    format_CMB_VungNuocCangBienHaiPhong_3.readFeatures(
        json_CMB_VungNuocCangBienHaiPhong_3,
        { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' },
    );
var jsonSource_CMB_VungNuocCangBienHaiPhong_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CMB_VungNuocCangBienHaiPhong_3.addFeatures(
    features_CMB_VungNuocCangBienHaiPhong_3,
);
var lyr_CMB_VungNuocCangBienHaiPhong_3 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_CMB_VungNuocCangBienHaiPhong_3,
    style: style_CMB_VungNuocCangBienHaiPhong_3,
    interactive: true,
    title: '<img src="styles/legend/CMB_VungNuocCangBienHaiPhong_3.png" /> CMB_VungNuocCangBienHaiPhong',
});
var format_CMB_VungNeoVaVungDonTraHoaTieu_4 = new ol.format.GeoJSON();
var features_CMB_VungNeoVaVungDonTraHoaTieu_4 =
    format_CMB_VungNeoVaVungDonTraHoaTieu_4.readFeatures(
        json_CMB_VungNeoVaVungDonTraHoaTieu_4,
        { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' },
    );
var jsonSource_CMB_VungNeoVaVungDonTraHoaTieu_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CMB_VungNeoVaVungDonTraHoaTieu_4.addFeatures(
    features_CMB_VungNeoVaVungDonTraHoaTieu_4,
);
var lyr_CMB_VungNeoVaVungDonTraHoaTieu_4 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_CMB_VungNeoVaVungDonTraHoaTieu_4,
    style: style_CMB_VungNeoVaVungDonTraHoaTieu_4,
    interactive: true,
    title: '<img src="styles/legend/CMB_VungNeoVaVungDonTraHoaTieu_4.png" /> CMB_VungNeoVaVungDonTraHoaTieu',
});
var format_CMB_CangHaiPhong_TenBenCang_5 = new ol.format.GeoJSON();
var features_CMB_CangHaiPhong_TenBenCang_5 =
    format_CMB_CangHaiPhong_TenBenCang_5.readFeatures(
        json_CMB_CangHaiPhong_TenBenCang_5,
        { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' },
    );
var jsonSource_CMB_CangHaiPhong_TenBenCang_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CMB_CangHaiPhong_TenBenCang_5.addFeatures(
    features_CMB_CangHaiPhong_TenBenCang_5,
);
var lyr_CMB_CangHaiPhong_TenBenCang_5 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_CMB_CangHaiPhong_TenBenCang_5,
    style: style_CMB_CangHaiPhong_TenBenCang_5,
    interactive: true,
    title: '<img src="styles/legend/CMB_CangHaiPhong_TenBenCang_5.png" /> CMB_CangHaiPhong_TenBenCang',
});
var format_CMB_CangHaiPhong_DuongThuy_6 = new ol.format.GeoJSON();
var features_CMB_CangHaiPhong_DuongThuy_6 =
    format_CMB_CangHaiPhong_DuongThuy_6.readFeatures(
        json_CMB_CangHaiPhong_DuongThuy_6,
        { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' },
    );
var jsonSource_CMB_CangHaiPhong_DuongThuy_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CMB_CangHaiPhong_DuongThuy_6.addFeatures(
    features_CMB_CangHaiPhong_DuongThuy_6,
);
var lyr_CMB_CangHaiPhong_DuongThuy_6 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_CMB_CangHaiPhong_DuongThuy_6,
    maxResolution: 280.0446615226196,
    minResolution: 0.14002233076130982,

    style: style_CMB_CangHaiPhong_DuongThuy_6,
    interactive: true,
    title: '<img src="styles/legend/CMB_CangHaiPhong_DuongThuy_6.png" /> CMB_CangHaiPhong_DuongThuy',
});
var format_CMB_CangHaiPhong_BenCang_7 = new ol.format.GeoJSON();
var features_CMB_CangHaiPhong_BenCang_7 =
    format_CMB_CangHaiPhong_BenCang_7.readFeatures(
        json_CMB_CangHaiPhong_BenCang_7,
        { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' },
    );
var jsonSource_CMB_CangHaiPhong_BenCang_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CMB_CangHaiPhong_BenCang_7.addFeatures(
    features_CMB_CangHaiPhong_BenCang_7,
);
var lyr_CMB_CangHaiPhong_BenCang_7 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_CMB_CangHaiPhong_BenCang_7,
    style: style_CMB_CangHaiPhong_BenCang_7,
    interactive: true,
    title: 'CMB_CangHaiPhong_BenCang<br />\
    <img src="styles/legend/CMB_CangHaiPhong_BenCang_7_0.png" /> Đất phát triển đô thị<br />\
    <img src="styles/legend/CMB_CangHaiPhong_BenCang_7_1.png" /> Đê chắn sóng Nam Đồ Sơn<br />\
    <img src="styles/legend/CMB_CangHaiPhong_BenCang_7_2.png" /> Hiện trạng<br />\
    <img src="styles/legend/CMB_CangHaiPhong_BenCang_7_3.png" /> Hiện trạng, di dời 2025<br />\
    <img src="styles/legend/CMB_CangHaiPhong_BenCang_7_4.png" /> Hiện trạng, di dời 2030<br />\
    <img src="styles/legend/CMB_CangHaiPhong_BenCang_7_5.png" /> Khu công nghiệp<br />\
    <img src="styles/legend/CMB_CangHaiPhong_BenCang_7_6.png" /> Quy hoạch 2025<br />\
    <img src="styles/legend/CMB_CangHaiPhong_BenCang_7_7.png" /> Quy hoạch 2030<br />\
    <img src="styles/legend/CMB_CangHaiPhong_BenCang_7_8.png" /> Quy hoạch sau 2030<br />\
    <img src="styles/legend/CMB_CangHaiPhong_BenCang_7_9.png" /> <br />',
});

lyr_GoogleSatelliteHybrid_0.setVisible(true);
lyr_GoogleMaps_1.setVisible(true);
lyr_CMB_PhaoBaoHieuTau_2.setVisible(true);
lyr_CMB_VungNuocCangBienHaiPhong_3.setVisible(true);
lyr_CMB_VungNeoVaVungDonTraHoaTieu_4.setVisible(true);
lyr_CMB_CangHaiPhong_TenBenCang_5.setVisible(true);
lyr_CMB_CangHaiPhong_DuongThuy_6.setVisible(true);
lyr_CMB_CangHaiPhong_BenCang_7.setVisible(true);
var layersList = [
    lyr_GoogleSatelliteHybrid_0,
    lyr_GoogleMaps_1,
    lyr_CMB_PhaoBaoHieuTau_2,
    lyr_CMB_VungNuocCangBienHaiPhong_3,
    lyr_CMB_VungNeoVaVungDonTraHoaTieu_4,
    lyr_CMB_CangHaiPhong_TenBenCang_5,
    lyr_CMB_CangHaiPhong_DuongThuy_6,
    lyr_CMB_CangHaiPhong_BenCang_7,
];
lyr_CMB_PhaoBaoHieuTau_2.set('fieldAliases', {
    OBJECTID: 'OBJECTID',
    ten: 'ten',
    phanLoai: 'phanLoai',
    style: 'style',
});
lyr_CMB_VungNuocCangBienHaiPhong_3.set('fieldAliases', {
    OBJECTID: 'OBJECTID',
    ThongTin: 'ThongTin',
    Shape_Length: 'Shape_Length',
    Shape_Area: 'Shape_Area',
});
lyr_CMB_VungNeoVaVungDonTraHoaTieu_4.set('fieldAliases', {
    OBJECTID: 'OBJECTID',
    phanloai: 'phanloai',
    thongtin: 'thongtin',
    style: 'style',
    Shape_Length: 'Shape_Length',
});
lyr_CMB_CangHaiPhong_TenBenCang_5.set('fieldAliases', {
    OBJECTID: 'OBJECTID',
    gid: 'gid',
    refname: 'refname',
    text: 'text',
    ten_loai_d: 'ten_loai_d',
    chu_giai: 'chu_giai',
});
lyr_CMB_CangHaiPhong_DuongThuy_6.set('fieldAliases', {
    OBJECTID: 'OBJECTID',
    gid: 'gid',
    phanloai: 'phanloai',
    thongtin: 'thongtin',
    style: 'style',
    ten_loai_d: 'ten_loai_d',
    chu_giai: 'chu_giai',
    Shape_Length: 'Shape_Length',
});
lyr_CMB_CangHaiPhong_BenCang_7.set('fieldAliases', {
    OBJECTID: 'OBJECTID',
    gid: 'gid',
    style: 'style',
    phanloai: 'phanloai',
    stt: 'stt',
    ten: 'ten',
    dvikhaitha: 'dvikhaitha',
    vtribencan: 'vtribencan',
    congnangkt: 'congnangkt',
    slcaucang: 'slcaucang',
    chieudai: 'chieudai',
    cotautn: 'cotautn',
    nlucthongq: 'nlucthongq',
    s_chiemdat: 's_chiemdat',
    coquanqlnn: 'coquanqlnn',
    qd_congbo: 'qd_congbo',
    khuben: 'khuben',
    ten_loai_d: 'ten_loai_d',
    chu_giai: 'chu_giai',
    Shape_Length: 'Shape_Length',
    Shape_Area: 'Shape_Area',
    toaDoVungDat: 'toaDoVungDat',
    toaDoVungNuoc: 'toaDoVungNuoc',
});
lyr_CMB_PhaoBaoHieuTau_2.set('fieldImages', {
    OBJECTID: 'TextEdit',
    ten: 'TextEdit',
    phanLoai: 'TextEdit',
    style: 'TextEdit',
});
lyr_CMB_VungNuocCangBienHaiPhong_3.set('fieldImages', {
    OBJECTID: 'TextEdit',
    ThongTin: 'TextEdit',
    Shape_Length: 'TextEdit',
    Shape_Area: 'TextEdit',
});
lyr_CMB_VungNeoVaVungDonTraHoaTieu_4.set('fieldImages', {
    OBJECTID: '',
    phanloai: '',
    thongtin: '',
    style: '',
    Shape_Length: '',
});
lyr_CMB_CangHaiPhong_TenBenCang_5.set('fieldImages', {
    OBJECTID: 'TextEdit',
    gid: 'Range',
    refname: 'TextEdit',
    text: 'TextEdit',
    ten_loai_d: 'TextEdit',
    chu_giai: 'TextEdit',
});
lyr_CMB_CangHaiPhong_DuongThuy_6.set('fieldImages', {
    OBJECTID: 'TextEdit',
    gid: 'Range',
    phanloai: 'TextEdit',
    thongtin: 'TextEdit',
    style: 'TextEdit',
    ten_loai_d: 'TextEdit',
    chu_giai: 'TextEdit',
    Shape_Length: 'TextEdit',
});
lyr_CMB_CangHaiPhong_BenCang_7.set('fieldImages', {
    OBJECTID: 'Hidden',
    gid: 'Hidden',
    style: 'Hidden',
    phanloai: 'TextEdit',
    stt: 'TextEdit',
    ten: 'TextEdit',
    dvikhaitha: 'TextEdit',
    vtribencan: 'TextEdit',
    congnangkt: 'TextEdit',
    slcaucang: 'TextEdit',
    chieudai: 'TextEdit',
    cotautn: 'TextEdit',
    nlucthongq: 'TextEdit',
    s_chiemdat: 'TextEdit',
    coquanqlnn: 'TextEdit',
    qd_congbo: 'TextEdit',
    khuben: 'TextEdit',
    ten_loai_d: 'TextEdit',
    chu_giai: 'TextEdit',
    Shape_Length: 'TextEdit',
    Shape_Area: 'TextEdit',
    toaDoVungDat: 'TextEdit',
    toaDoVungNuoc: 'TextEdit',
});
lyr_CMB_PhaoBaoHieuTau_2.set('fieldLabels', {
    OBJECTID: 'no label',
    ten: 'no label',
    phanLoai: 'no label',
    style: 'no label',
});
lyr_CMB_VungNuocCangBienHaiPhong_3.set('fieldLabels', {
    OBJECTID: 'no label',
    ThongTin: 'no label',
    Shape_Length: 'no label',
    Shape_Area: 'no label',
});
lyr_CMB_VungNeoVaVungDonTraHoaTieu_4.set('fieldLabels', {
    OBJECTID: 'no label',
    phanloai: 'no label',
    thongtin: 'no label',
    style: 'no label',
    Shape_Length: 'no label',
});
lyr_CMB_CangHaiPhong_TenBenCang_5.set('fieldLabels', {
    OBJECTID: 'no label',
    gid: 'no label',
    refname: 'no label',
    text: 'no label',
    ten_loai_d: 'no label',
    chu_giai: 'no label',
});
lyr_CMB_CangHaiPhong_DuongThuy_6.set('fieldLabels', {
    OBJECTID: 'inline label',
    gid: 'inline label',
    phanloai: 'inline label',
    thongtin: 'inline label',
    style: 'inline label',
    ten_loai_d: 'inline label',
    chu_giai: 'inline label',
    Shape_Length: 'inline label',
});
lyr_CMB_CangHaiPhong_BenCang_7.set('fieldLabels', {
    phanloai: 'inline label',
    stt: 'inline label',
    ten: 'inline label',
    dvikhaitha: 'inline label',
    vtribencan: 'inline label',
    congnangkt: 'inline label',
    slcaucang: 'inline label',
    chieudai: 'inline label',
    cotautn: 'inline label',
    nlucthongq: 'inline label',
    s_chiemdat: 'inline label',
    coquanqlnn: 'inline label',
    qd_congbo: 'inline label',
    khuben: 'inline label',
    ten_loai_d: 'inline label',
    chu_giai: 'inline label',
    Shape_Length: 'inline label',
    Shape_Area: 'inline label',
    toaDoVungDat: 'inline label',
    toaDoVungNuoc: 'inline label',
});
lyr_CMB_CangHaiPhong_BenCang_7.on('precompose', function (evt) {
    evt.context.globalCompositeOperation = 'normal';
});
