# -*- coding: utf-8-*-

import os

is_develop = True

installed_apps = ['demo']

template_dir = os.path.join(os.path.dirname(__file__), "templates")

static_dir = os.path.join(os.path.dirname(__file__), "static")

port = 8888
