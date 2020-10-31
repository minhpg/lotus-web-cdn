# Lotus.VN Web CDN Unlimited Upload [Patched - Not Working]

Python script to upload videos to [Lotus.vn](https://lotus.vn) without 300MB limit

- High speed CDN
- Free video transcoding (144p -> 1080p)
- Unlimited uploads!

## Installation

Clone this repository:

```bash
git clone https://github.com/minhpg/lotus-web-cdn
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Install RabbitMQ, Gunicorn and NGINX:
```bash
sudo apt-get install rabbitmq-server gunicorn nginx
```
## Features
- Remote download from Google Drive
- RabbitMQ + Celery - Task queuing
- MongoDB Database
- [P2P Player](https://github.com/novage/p2p-media-loader)
- Upload original quality

## Usage

Recommended: Use with Gunicorn WSGI directly, or behind a reverse proxy (e.g. NGINX).

Example: (Gunicorn without NGINX)
```
sudo nohup gunicorn -b 0.0.0.0:80 server:main & sudo nohup celery -A server worker --loglevel=INFO --concurrency=1 -n worker1@%h & sudo tail -f nohup.out && fg
```
GET Request to API to add video to queue:
```
http://{{your domain}}/api?drive=
```
Not recommended: DO NOT RUN THE SCRIPT DIRECTLY. WILL CRASH ON ERROR.

## Project Status
- Lotus.vn patched their API (server-side size check), which means the script won't work. 
- Lotus.vn's Player Javascript will not work as well. Any other video player will work (JWPlayer, etc.)
- New version available (Requires a CMS account from Lotus.vn)
