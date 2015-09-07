# -*- coding: utf-8-*-

import tornado.web
import tornado.template

import settings


class RequestMapping:
    
    def __init__(self, value):
        self.value = value
    
    def __call__(self, handler):
        self.handler = handler
        return self


class Application(tornado.web.Application):

    def __init__(self):
        
        handlers = []
        installed_apps = settings.installed_apps
        for appName in installed_apps:
            app_package = __import__(appName, globals(), locals(), ['views'], -1)
            views = app_package.views

            for handler_name in dir(views):
                handler_wrapper = getattr(views, handler_name)
                if isinstance(handler_wrapper, RequestMapping):
                    handlers.append((handler_wrapper.value, handler_wrapper.handler))

        super(Application, self).__init__(handlers, **{
            "static_path": settings.static_dir,
            "cookie_secret" : "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
            "template_path": settings.template_dir,
            "debug" : True,

        })




