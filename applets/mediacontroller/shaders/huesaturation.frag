// Copyright (C) 2017 The Qt Company Ltd.
// SPDX-License-Identifier: LGPL-3.0-only OR GPL-2.0-only OR GPL-3.0-only

#version 440

layout(location = 0) in vec2 qt_TexCoord0;
layout(location = 0) out vec4 fragColor;

layout(std140, binding = 0) uniform buf {
    mat4 qt_Matrix;
    float qt_Opacity;
    vec3 hsl;
};

layout(binding = 1) uniform sampler2D source;

vec3 rgbToHsl(vec3 color)
{
    float cmin = min(color.r, min(color.g, color.b));
    float cmax = max(color.r, max(color.g, color.b));
    float h = 0.0;
    float s = 0.0;
    float l = (cmin + cmax) / 2.0;
    float diff = cmax - cmin;
    if (diff > 1.0 / 256.0) {
        s = l < 0.5 ? diff / (cmin + cmax) : diff / (2.0 - (cmin + cmax));
        if (color.r == cmax)
            h = (color.g - color.b) / diff;
        else if (color.g == cmax)
            h = 2.0 + (color.b - color.r) / diff;
        else
            h = 4.0 + (color.r - color.g) / diff;
        h /= 6.0;
    }
    return vec3(h, s, l);
}

float hueToIntensity(float v1, float v2, float h)
{
    h = fract(h);
    if (h < 1.0 / 6.0)
        return v1 + (v2 - v1) * 6.0 * h;
    if (h < 1.0 / 2.0)
        return v2;
    if (h < 2.0 / 3.0)
        return v1 + (v2 - v1) * 6.0 * (2.0 / 3.0 - h);
    return v1;
}

vec3 hslToRgb(vec3 color)
{
    float h = color.x;
    float s = color.y;
    float l = color.z;
    if (s < 1.0 / 256.0)
        return vec3(l);
    float v2 = l < 0.5 ? l * (1.0 + s) : (l + s) - (s * l);
    float v1 = 2.0 * l - v2;
    float d = 1.0 / 3.0;
    return vec3(hueToIntensity(v1, v2, h + d), hueToIntensity(v1, v2, h), hueToIntensity(v1, v2, h - d));
}

void main()
{
    vec4 sampleColor = texture(source, qt_TexCoord0);
    sampleColor = vec4(sampleColor.rgb / max(1.0 / 256.0, sampleColor.a), sampleColor.a);
    sampleColor.rgb = mix(vec3(dot(sampleColor.rgb, vec3(0.2125, 0.7154, 0.0721))), sampleColor.rgb, 1.0 + hsl.y);
    sampleColor.xyz = rgbToHsl(sampleColor.rgb);
    sampleColor.rgb = hslToRgb(vec3(sampleColor.x + hsl.x, sampleColor.y, sampleColor.z));
    float targetLightness = step(0.0, hsl.z);
    sampleColor.rgb = mix(sampleColor.rgb, vec3(targetLightness), abs(hsl.z));
    fragColor = vec4(sampleColor.rgb * sampleColor.a, sampleColor.a) * qt_Opacity;
}
