#version 330 core
out vec3 color;

uniform sampler2D u_palette;
uniform sampler2D u_texture;

flat in vec2 v_r;
in vec4 v_p;

void main() {
    vec2 uv = vec2(v_p.x, v_p.y) / v_p.w * vec2(1, -1);
    uv = vec2(uv.x - 4.0 * v_r.x / 3.14159, uv.y + 1.0 + v_r.y);
    if (uv.y < 0.0 || uv.y >= 2.0) {
        uv.y = abs(mod(-uv.y + .085, 0.17) - .085);
    } else if (uv.y >= 1.0) {
        uv.y = 1.0 - uv.y;
    }
    float palette_index = texture2D(u_texture, uv).r;
    color = texture2D(u_palette, vec2(palette_index, 0)).rgb;
}