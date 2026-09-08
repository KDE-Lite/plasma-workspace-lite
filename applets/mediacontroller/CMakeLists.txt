# SPDX-FileCopyrightText: 2022 Bharadwaj Raju <bharadwaj.raju777@protonmail.com>
# SPDX-License-Identifier: GPL-3.0-only OR LicenseRef-KDE-Accepted-GPL

# Work around qmlcachegen crashing during the build
if (Qt6_VERSION VERSION_LESS "6.9.2")
    set(QML_ARGS NO_CACHEGEN)
endif()

plasma_add_applet(org.kde.plasma.mediacontroller
    QML_SOURCES
        main.qml
        AlbumArtStackView.qml
        CompactRepresentation.qml
        ExpandedRepresentation.qml
        HueSaturationEffect.qml
    CPP_SOURCES
        globalconfig.cpp
    GENERATE_APPLET_CLASS
    QML_ARGS ${QML_ARGS}
)

qt_add_shaders(org.kde.plasma.mediacontroller "mediacontroller_huesaturation_shader"
    PREFIX "/qt/qml/org/kde/plasma/mediacontroller"
    FILES shaders/huesaturation.frag
)
