// SPDX-License-Identifier: LGPL-3.0-only OR GPL-2.0-only OR GPL-3.0-only

import QtQuick

ShaderEffect {
    property var source
    property real hue: 0
    property real saturation: 0
    property real lightness: 0
    property vector3d hsl: Qt.vector3d(hue, saturation, lightness)

    fragmentShader: "qrc:/qt/qml/org/kde/plasma/mediacontroller/shaders/huesaturation.frag.qsb"
}
