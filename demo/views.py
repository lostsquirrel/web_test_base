# -*- coding: utf-8-*-

import tornado.web
from application import RequestMapping
from datetime import datetime


@RequestMapping(r"/")
class DemoHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("demo.html", items=[])