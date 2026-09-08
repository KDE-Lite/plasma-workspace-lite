/*
    SPDX-FileCopyrightText: 2022 Fushan Wen <qydwhotmail@gmail.com>

    SPDX-License-Identifier: GPL-2.0-or-later
*/

import QtQuick
import QtQuick.Effects

MultiEffect {
    source: backgroundColor.blurSource
    blurEnabled: true
    blur: 1
    blurMax: 32
    blurMultiplier: 0
}
