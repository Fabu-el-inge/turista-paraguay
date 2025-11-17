#!/usr/bin/env python3
# -*- coding: utf-8 -*-

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Reemplazar las comillas problemáticas
old_text = '''onclick="showImageModal('${product.imageUrl}')">'''
new_text = '''onclick='showImageModal("${product.imageUrl}")'>'''

content = content.replace(old_text, new_text)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Archivo corregido exitosamente!")
