from setuptools import setup

setup(
  name             = 'play-hackmit',
  version          = '0.1.0',
  description      = 'OpenShift App',
  author           = '',
  author_email     = '',
  url              = 'http://www.python.org/sigs/distutils-sig/',
  packages         = [
    'processing'
  ],
  install_requires = [
    'flask == 0.10.1',
    'requests == 2.7.0',
    'indicoio == 0.9.2',
    'lxml == 3.4.4',
    'html2text == 2015.6.21'
  ]
)

