#!/usr/bin/env bash
gunicorn configuracion.wsgi:application
