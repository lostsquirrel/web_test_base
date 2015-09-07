# -*- coding: utf-8-*-

import tornado.httpserver
import tornado.ioloop

import application
import settings
         
if __name__ == '__main__':

    server = tornado.httpserver.HTTPServer(application.Application())
    server.listen(settings.port)
    tornado.ioloop.IOLoop.instance().start()