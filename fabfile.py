from fabric.api import *
import fabric.contrib.project as project
import os
import sys
import SocketServer

from pelican.server import ComplexHTTPRequestHandler

# Local path configuration (can be absolute or relative to fabfile)
env.deploy_path = 'output'
DEPLOY_PATH = env.deploy_path

# Port for `serve`
PORT = 8000


def getconf(type=None, publish=False):
    if type == 'amp':
        return 'amp_publishconf.py' if publish else 'amp_pelicanconf.py'
    else:
        return 'publishconf.py' if publish else 'pelicanconf.py'

def watch():
    """Automatically regenerate site upon file modification"""
    local('pelican -r -s {}'.format(getconf()))
    local('pelican -r -s {}'.format(getconf(type='amp')))

def serve():
    """Serve site at http://localhost:8000/"""
    os.chdir(env.deploy_path)

    class AddressReuseTCPServer(SocketServer.TCPServer):
        allow_reuse_address = True

    server = AddressReuseTCPServer(('', PORT), ComplexHTTPRequestHandler)

    sys.stderr.write('Serving on port {0} ...\n'.format(PORT))
    server.serve_forever()

def publish():
    """Build production version of site"""
    local('npm run build')
    local('pelican -s {}'.format(getconf(publish=True)))
    local('pelican -s {}'.format(getconf(type='amp', publish=True)))
    local("./scripts/amp_tag_replace.py 'output/amp/post/*/*.html'")
    local('if test -d content/extra; then cp content/extra/* output/; fi')
