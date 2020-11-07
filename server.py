from flask import Blueprint, Flask,redirect, session, g, render_template, url_for,request, send_from_directory  ,Response #imports
import requests
import os
import sys
from flask_celery import make_celery
from flask_pymongo import PyMongo
import random
from random import choice,randint
import time
import datetime 
from multiprocessing.pool import ThreadPool
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from pydrive.files import GoogleDriveFile
from os import path
from multiprocessing.pool import ThreadPool
import io
from apiclient import errors
from apiclient import http
import json
from bson.objectid import ObjectId
from requests_toolbelt import MultipartEncoder
import filetype

def download_file_icq(url,fileid,size):   # Streaming, so we can iterate over the response.
    response =requests.get(url, stream=True,verify=False)
    total_size_in_bytes= int(size)
    block_size = 1024*1024
    progress_bar = tqdm(total=total_size_in_bytes, unit='iB', unit_scale=True)
    with open(fileid, 'wb') as file:
        for data in response.iter_content(block_size):
            progress_bar.update(len(data))
            file.write(data)
    progress_bar.close()
    if total_size_in_bytes != 0 and progress_bar.n != total_size_in_bytes:
        print("ERROR, something went wrong")
        os.remove(fileid)
        return None
    return fileid

def icq_mongo(fileid):
    icq_db = mongo.db.kyunkyun
    query = icq_db.find_one({"drive":fileid})
    if query:
        if "icqstream" in query.keys():
            TOKEN = "001.3617003158.0151996798:754693810"
            bot = Bot(token=TOKEN)
            try:
                response = bot.get_file_info(query["icqstream"]).json()
                print(response)
                url = response["url"]
                filesize = response["size"]
                path = download_file_icq(url,fileid,filesize)
                return path
            except:
                return None
        else:
            return None
    else:
        return None

def getUserInfo():
    header={"Cookie":"_kh_d_guid=892466748f4544f5e6fcfea6074bf76b; lotus=CfDJ8Dq0dlIYuJNOgmJyXTgyxclwVdrWqIfgqvG-42_w84Nyx-9cLLKI_hhdtkOkvBFOkoh-OkHTb8FTkV0715e4AYup0EIL_hITIwxDPfUyBLyp0kXKz_xQkhR1lZl3HrepLWPfrpR5zpWFz9nOAoaKxXCMbfSvAw3Z_o2USsXzNYQlcPIcJZc2XMNbyERY02yx2R7C4seYq0LKhvHLqiSLukZE7A3gNdVjXOnzXe-vzjdrdXQhMuXcgHDbZzKGG6ZHVXJF_W_5k-OVB3_qAXOkDRF6n2WgXljTMUILlbk23sD_BKGB9DKw4ViDnveHJzpcf3Y-BA-wp14hRdeOp8RFsUYmqJEaDCXgB9uibtKjLeHWhfyifJRASWkD18Yg0DkDiSDNl2KwWgxPlZgJHPcZsxGVBtCo_J5DKQcPME-3r3cX7v_nFTCmb5IQbZsjp5_fKCbyBTJtoVWtG33hMMGw8oozxByYGe9YkUIlWljKog6OHwApz6fCC0HiNeHBPiAK3NBK6c_Wu9DAbN3pct3MFcC7EkUetp3ZrGft7qOiX4mMytWofr7wI4T4IUIA9PNDMDGE6WCqWxYvCp1EpV0uvlf4SNGWMp29XW8aJ3bm3JMu1mxHy7CA6F5IkpKkxddCvoYu6VLb3dPfHNJmEIdzHQf7OqxRU1vciUzvvHUU4suncQPcoqomnZq9Zoswf54N-eMXIPi28M_4KRzX8bNcAjN-uihmPITW3oMkPr2AA3QVEUlK3LDS8SZfPwCvZmnlGyJKmqQXnExQ3YoDkdWHpmg5BoXuD1Pr5LZpBKM5ORbcoZI2KagZj2JYVDCWAJx-5xCBmg5qdQbKlgqdZPFx8VHeiV9q3nz_KhFHYgqiT8t93EaW4pPPnZonVeXqCapugWX_g_Km1nxrcJIVDqTVuQXyEXVriY2haIpwDszt1zA__xvXnw2mBzIiNszzblbaJy3bXzGSeTYUiV2MO5ExOf-xnZH1uxwr1OR7Ry4U0BZJz4tP9kVhaGQcR3suhzuekoxdfm3-sRcqiic_QUiHQvVFpzTNgvmEp-PnceN6301HQA7Eo4W8xMlTymUBsrZlBytJlIC_uXTWUq_ULEcNmMveWX30DWxyt0WuH3jDqm34py8AC7D5pK4Ih0URPa5nVxh1xW6UY16nOQ0aYCJPVvb-_9QK4TxoevPtMzSmxf1XL1BnD0aFQt8HzSyvp3frvojcySKC7hZfD6Pa7miV_V3Y6-TRM4wbYOV4UKHX39PVM2DmLuHv-zTHcMrQbAFW_xMMXRYyu4RM_QzjUXAZqhq5_G5TFbaYuIdYRIb3xu69EirqOqwnNATS_4w_tPZ9Hlf1yI_to1i4ZnjKvHmLtpcdXdshCRuh03qXfwwkYNsf_6j8G7i7b3DFaFGpHHpJ_9M5vmQ52PT-liztubVZa0bcR1NElfdnoZV3kTx8ocA8IXXXUwl35ztr_Ybo3e-mBf1LBZ3gh98zEad8M6lYxORNkJ8LQtAvHgV-xm-eWWtafpTWVtekRb42tRINnibbP_0gKeFJxe6hX2oh4Sqf9WISB67isnFWXULTwurC6YkcqkHXoh0n_F9GxujwUZ_CMDUIjWspozPS3uNdL-EL6YiF9p5P7QkvXVht0NbkzrXq; _lt_sd=PwdfIiFSBSsbFh4VKQk8UDlRRGtFKFElQD8FWRM/PBEYWxxzS0RXJlgECgtnbHATeBYTIgIUaTldUlFbcWJiBWQCX2JXVAZgDkFYQXN0fhMnURUiDglYOV1SUVsjMGICZgJTYgYHAGlfFAlMdW4zBTUDAjdRVwcxXEZcQHVmYgFkBVFjAgcGZQhHXB1nKw==; __admUTMtime=1598859448; _kh_t_e_a_s=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnYXRld2F5MSIsImF1ZCI6WyJ3ZWJraW5naHViIiwid2Via2luZ2h1YiJdLCJyb2xlIjoibWVtYmVyIiwiZXhwIjoxNTk4ODYwMDczLCJpYXQiOiIyMDIwLTA4LTMxIDE0OjM3In0.glZaFd_fcxlRQKPNt4EvewRhyfInMgHxYksy2BAtaGM"}
    response = requests.post("https://lotus.vn/w/authenticate/getuserinfo",headers=header)
    metadata = response.json()["data"]
    #print(metadata)
    return {"user_id":metadata["user_id"],"sessionid":metadata["sessionid"],"type":metadata["type"]}

def gtk():
    header={"Cookie":"_kh_d_guid=892466748f4544f5e6fcfea6074bf76b; lotus=CfDJ8Dq0dlIYuJNOgmJyXTgyxclwVdrWqIfgqvG-42_w84Nyx-9cLLKI_hhdtkOkvBFOkoh-OkHTb8FTkV0715e4AYup0EIL_hITIwxDPfUyBLyp0kXKz_xQkhR1lZl3HrepLWPfrpR5zpWFz9nOAoaKxXCMbfSvAw3Z_o2USsXzNYQlcPIcJZc2XMNbyERY02yx2R7C4seYq0LKhvHLqiSLukZE7A3gNdVjXOnzXe-vzjdrdXQhMuXcgHDbZzKGG6ZHVXJF_W_5k-OVB3_qAXOkDRF6n2WgXljTMUILlbk23sD_BKGB9DKw4ViDnveHJzpcf3Y-BA-wp14hRdeOp8RFsUYmqJEaDCXgB9uibtKjLeHWhfyifJRASWkD18Yg0DkDiSDNl2KwWgxPlZgJHPcZsxGVBtCo_J5DKQcPME-3r3cX7v_nFTCmb5IQbZsjp5_fKCbyBTJtoVWtG33hMMGw8oozxByYGe9YkUIlWljKog6OHwApz6fCC0HiNeHBPiAK3NBK6c_Wu9DAbN3pct3MFcC7EkUetp3ZrGft7qOiX4mMytWofr7wI4T4IUIA9PNDMDGE6WCqWxYvCp1EpV0uvlf4SNGWMp29XW8aJ3bm3JMu1mxHy7CA6F5IkpKkxddCvoYu6VLb3dPfHNJmEIdzHQf7OqxRU1vciUzvvHUU4suncQPcoqomnZq9Zoswf54N-eMXIPi28M_4KRzX8bNcAjN-uihmPITW3oMkPr2AA3QVEUlK3LDS8SZfPwCvZmnlGyJKmqQXnExQ3YoDkdWHpmg5BoXuD1Pr5LZpBKM5ORbcoZI2KagZj2JYVDCWAJx-5xCBmg5qdQbKlgqdZPFx8VHeiV9q3nz_KhFHYgqiT8t93EaW4pPPnZonVeXqCapugWX_g_Km1nxrcJIVDqTVuQXyEXVriY2haIpwDszt1zA__xvXnw2mBzIiNszzblbaJy3bXzGSeTYUiV2MO5ExOf-xnZH1uxwr1OR7Ry4U0BZJz4tP9kVhaGQcR3suhzuekoxdfm3-sRcqiic_QUiHQvVFpzTNgvmEp-PnceN6301HQA7Eo4W8xMlTymUBsrZlBytJlIC_uXTWUq_ULEcNmMveWX30DWxyt0WuH3jDqm34py8AC7D5pK4Ih0URPa5nVxh1xW6UY16nOQ0aYCJPVvb-_9QK4TxoevPtMzSmxf1XL1BnD0aFQt8HzSyvp3frvojcySKC7hZfD6Pa7miV_V3Y6-TRM4wbYOV4UKHX39PVM2DmLuHv-zTHcMrQbAFW_xMMXRYyu4RM_QzjUXAZqhq5_G5TFbaYuIdYRIb3xu69EirqOqwnNATS_4w_tPZ9Hlf1yI_to1i4ZnjKvHmLtpcdXdshCRuh03qXfwwkYNsf_6j8G7i7b3DFaFGpHHpJ_9M5vmQ52PT-liztubVZa0bcR1NElfdnoZV3kTx8ocA8IXXXUwl35ztr_Ybo3e-mBf1LBZ3gh98zEad8M6lYxORNkJ8LQtAvHgV-xm-eWWtafpTWVtekRb42tRINnibbP_0gKeFJxe6hX2oh4Sqf9WISB67isnFWXULTwurC6YkcqkHXoh0n_F9GxujwUZ_CMDUIjWspozPS3uNdL-EL6YiF9p5P7QkvXVht0NbkzrXq; _lt_sd=PwdfIiFSBSsbFh4VKQk8UDlRRGtFKFElQD8FWRM/PBEYWxxzS0RXJlgECgtnbHATeBYTIgIUaTldUlFbcWJiBWQCX2JXVAZgDkFYQXN0fhMnURUiDglYOV1SUVsjMGICZgJTYgYHAGlfFAlMdW4zBTUDAjdRVwcxXEZcQHVmYgFkBVFjAgcGZQhHXB1nKw==; __admUTMtime=1598859448; _kh_t_e_a_s=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnYXRld2F5MSIsImF1ZCI6WyJ3ZWJraW5naHViIiwid2Via2luZ2h1YiJdLCJyb2xlIjoibWVtYmVyIiwiZXhwIjoxNTk4ODYwMDczLCJpYXQiOiIyMDIwLTA4LTMxIDE0OjM3In0.glZaFd_fcxlRQKPNt4EvewRhyfInMgHxYksy2BAtaGM"}
    response = requests.get("https://lotus.vn/w/a/gtk",headers=header)
    metadata = response.json()["data"]
    auth_key = getAuthentication(response.headers["set-cookie"])
    metadata["auth_key"] = auth_key
    #print(metadata)
    return metadata

def getAuthUserInfo(auth_key,sessionid,user_id):
    header={"Authorization":"Bearer "+auth_key,"session-id":sessionid}
    response = requests.get("https://webpub.lotuscdn.vn/api/webkinghub/kinghub-user/get-auth-userinfo?user_id="+user_id,headers=header,verify=False)
    data = response.json()
    return data

def getAuthentication(cookie):
    init  = cookie.find("=")
    end = cookie.find(";")
    return cookie[init+1:end]

def getToken(auth_key,sessionid,user_id):
    header={"Authorization":"Bearer "+auth_key,"session-id":sessionid}
    response = requests.post("https://webpub.lotuscdn.vn/api/social/token",headers=header,data={"userId":user_id},verify=False)
    data = response.json()
    print(data)
    return data

def kinghubPolicy(auth_key,api_key,sessionid,filename):
    header={"Authorization":"Bearer "+auth_key,"session-id":sessionid,"API-Authorization":api_key}
    response = requests.get("https://webpub.lotuscdn.vn/api/webkinghub/kinghub-policy?filename="+filename+"&convert=true",headers=header,verify=False)
    data = response.json()
    print(data)
    return data

def generateFilename(file):
    ts = int(time.time()*1000)
    string = get_random_string()
    #file_metadata = filetype.guess(file)
    #if file_metadata:
    #    return str(ts)+"-"+string+"."+file_metadata.extension
    
    #else:
    return str(ts)+"-"+string+".mp4"

def lotusAuth(filename):
    auth_key = gtk()["auth_key"]
    user_data = getUserInfo()
    sessionid = user_data["sessionid"]
    user_id = user_data["user_id"]
    api_key = getToken(auth_key,sessionid,user_id)["access_token"]
    print(filename)
    policy = kinghubPolicy(auth_key,api_key,sessionid,filename)["policy"]
    return {"policy":policy["encoded_policy"],"filename":filename,"signature":policy["signature"],"sessionid":sessionid,"api_key":api_key,"auth_key":auth_key}

def uploadAPI(filename,policy,signature,file):
    data = MultipartEncoder({"filename":filename,"signature":signature,"filedata":(file,open(file,"rb"),"video/mp4"),"policy":policy})
    #postdata = {"filename":filename,"signature":signature,"filedata":open(file,"rb"),"policy":policy}
    header = {"Content-Type":data.content_type,"Content-Length":"0","User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"}
    response = requests.post("https://mps.lotuscdn.vn/_/upload",headers=header,data=data,verify=False)
    print(response.json())
    return response.json()

def kinghubFileInfo(filepath,api_key,auth_key,sessionid):
    header={"Authorization":"Bearer "+auth_key,"session-id":sessionid,"API-Authorization":api_key}
    response = requests.get("https://webpub.lotuscdn.vn/api/webkinghub/kinghub-fileinfo?filename="+filepath,headers=header,verify=False)
    print(response.json())
    return response.json()


def get_random_string(length=10):
    letters_and_digits = string.ascii_lowercase + string.digits
    result_str = ''.join((random.choice(letters_and_digits) for i in range(length)))
    return result_str

def upload(file):
    try:
        filename = generateFilename(file)
        auth = lotusAuth(filename)
        filename = auth["filename"]
        policy = auth["policy"]
        signature  = auth["signature"]
        sessionid = auth["sessionid"]
        api_key = auth["api_key"]
        auth_key = auth["auth_key"]
        upload_details = uploadAPI(filename,policy,signature,file)
        #time.sleep(2)
        #video_info = kinghubFileInfo(upload_details["file_path"],api_key,auth_key,sessionid)
        return upload_details
    except:
        return None

def fetchFileInfo(file_path):
    try:
        auth = lotusAuthFileInfo()
        sessionid = auth["sessionid"]
        api_key = auth["api_key"]
        auth_key = auth["auth_key"]
        video_info = kinghubFileInfo(file_path,api_key,auth_key,sessionid)
        return video_info
    except:
        return None

def lotusAuthFileInfo():
    auth_key = gtk()["auth_key"]
    user_data = getUserInfo()
    sessionid = user_data["sessionid"]
    user_id = user_data["user_id"]
    api_key = getToken(auth_key,sessionid,user_id)["access_token"]
    return {"sessionid":sessionid,"api_key":api_key,"auth_key":auth_key}


def getid(link):
    id = link.replace("https://drive.google.com","").replace("/file/d/","").replace("open?id=","").replace("/view","").replace("/edit","").replace("?usp=sharing","")
    return id

def create_credential():
    from GoogleAuthV1 import auth_and_save_credential
    auth_and_save_credential()


# Authentication + token creation
def create_drive_manager():
    gAuth = GoogleAuth()
    typeOfAuth = None
    if not path.exists("credentials.txt"):
        typeOfAuth = input("type save if you want to keep a credential file, else type nothing")
    bool = True if typeOfAuth == "save" or path.exists("credentials.txt") else False
    authorize_from_credential(gAuth, bool)
    drive: GoogleDrive = GoogleDrive(gAuth)
    return drive


def authorize_from_credential(gAuth, isSaved):
    if not isSaved: #no credential.txt wanted
        from GoogleAuthV1 import auth_no_save
        auth_no_save(gAuth)
    if isSaved and not path.exists("credentials.txt"):
        create_credential()
        gAuth.LoadCredentialsFile("credentials.txt")
    if isSaved and gAuth.access_token_expired:
        gAuth.LoadCredentialsFile("credentials.txt")
        gAuth.Refresh()
        print("token refreshed!")
        gAuth.SaveCredentialsFile("credentials.txt")
    gAuth.Authorize()
    print("authorized access to google drive API!")
    

def download(fileid): #downloader
    while True:
        try:
            file = driver.CreateFile({"id":fileid})
            file.GetContentFile(fileid)
            if os.stat(fileid).st_size == file["size"]:
                return(fileid)
            else:
                if os.path.isfile(fileid):
                    os.remove(fileid)
                continue
        except:
            if os.path.isfile(fileid):
                os.remove(fileid)
            return None

def MediaToBaseDownloader(fileid):
    file = driver.CreateFile({"id":fileid})
    local_fd = open(fileid,"wb")
    request = driver.auth.service.files().get_media(fileId=fileid)
    media_request = http.MediaIoBaseDownload(local_fd, request)
    while True:
        try:
            download_progress, done = media_request.next_chunk()
        except errors.HttpError as error:
            print ('An error occurred: %s' % error)
            return None
        if download_progress:
            print ('Download Progress: %d%%' % int(download_progress.progress() * 100))
        if done:
            print ('Download Complete')
            return fileid

def generate(link):
    if link == None:
        return None
    s = link.replace("https://drive.google.com","").replace("/file/d/","").replace("open?id=","").replace("/view","").replace("/edit","").replace("?usp=sharing","").replace(" ","").replace("\n","")
    drive = s[::-1]
    cdn = "https://lotus.animetvn.com/stream?id="+drive
    return cdn+"\n"

main = Flask(__name__) #setup vaariables
main.config["MONGO_URI"] = "mongodb+srv://admin:SRwiE3Bd5ydzXIQN@cluster0-lqumo.mongodb.net/icqpublic?retryWrites=true&w=majority"
main.config["CELERY_RESULT_BACKEND"] = "mongodb+srv://admin:SRwiE3Bd5ydzXIQN@cluster0-lqumo.mongodb.net/worker?retryWrites=true&w=majority"
main.config["CELERY_BROKER_URL"]="amqp://localhost//"
main.config["SECRET_KEY"] = "04082004"
method_requests_mapping = {
    'GET': requests.get,
    'HEAD': requests.head,
    'POST': requests.post,
    'PUT': requests.put,
    'DELETE': requests.delete,
    'PATCH': requests.patch,
    'OPTIONS': requests.options,
}
#inits

celery = make_celery(main)
mongo = PyMongo()
mongo.init_app(main)
video_db = mongo.db.lotus
user_collection = mongo.db.users
driver=create_drive_manager()

@celery.task(name="api") #celery implementation for queueing
def celeryapi(fileid):
    try:
        path = MediaToBaseDownloader(fileid)
        if path:
            lotus = upload(path)
            if lotus:
                os.remove(path)
                myquery ={"drive":str(fileid)}
                newvalues = { "$set": lotus}
                video_db.update_one(myquery,newvalues)
                file = driver.CreateFile({"id":fileid})
                newvalues = { "$set": {"title":file["title"],"ts":str(time.time())}}
                video_db.update_one(myquery,newvalues)
                return "Done"
            else:
                if os.path.isfile(fileid):
                    os.remove(fileid)
                video_db.delete_one({"drive":fileid})
                return "Unsuccessful"
        else:
            if os.path.isfile(fileid):
                os.remove(fileid)
            video_db.delete_one({"drive":fileid})
            return "Unsuccessful"
    except:
        if os.path.isfile(fileid):
            os.remove(fileid)
        video_db.delete_one({"drive":fileid})
        return "Unsuccessful"

@main.route("/api") #main engine
def lotus():
    video_db = mongo.db.lotus
    user_collection = mongo.db.users
    if request.args:
        args = request.args
        fileid = args.get("drive").replace("https://drive.google.com","").replace("/file/d/","").replace("open?id=","").replace("/view","").replace("/edit","").replace("?usp=sharing","")
        key = args.get("key")
        check = video_db.find_one({"drive":str(fileid)})
        if check:
            encrypt =str(check["_id"])
            if 'info' in check.keys() or "file_path" in check.keys():
                dict ={"status":"done","embed": "https://lotus.animetvn.com/?id="+str(encrypt)}
            else:
                dict ={"status":"processing","embed": "https://lotus.animetvn.com/?id="+str(encrypt)}
            return json.dumps(dict)
        else: 
            try:
                video_db.insert_one({'drive' : str(fileid),"key":key})
                encrypt = video_db.find_one({"drive":str(fileid)})["_id"]
                celeryapi.delay(fileid)
                dict ={"status":"processing","embed": "https://lotus.animetvn.com/?id="+str(encrypt)}
                return json.dumps(dict)
            except:
                return json.dumps({"status":"unavailable"}),404

    else:
        return json.dumps({"status":"unavailable"}),404

@main.route("/")
def stream():
    video_db = mongo.db.lotus
    if request.args:
        args = request.args
        drive= args.get("id")
        query = video_db.find_one({"_id":ObjectId(drive)})
        if query:
            if "info" in query.keys():
                if args.get("hls"):
                    return render_template("lotus.html",playlist = query["info"]["full_path"]+"/master.m3u8",thumbnail=query["info"]["thumbnail"],title=query["title"])
                return render_template("lotus.html",playlist = query["info"]["full_path"],thumbnail=query["info"]["thumbnail"],title=query["title"])
            if "file_path" in query.keys():
                if "ts" in query.keys():
                    if (float(query["ts"])+float(3600)) < time.time():
                        return render_template("lotus.html",playlist = "https://web.lotuscdn.vn"+query["file_path"]+"/master.m3u8",title=query["title"])
                    else:
                        return render_template("lotus.html",playlist = "https://web.lotuscdn.vn"+query["file_path"],title=query["title"])
                else:
                    return render_template("lotus.html",playlist = "https://web.lotuscdn.vn"+query["file_path"]+"/master.m3u8",title=query["title"])
            else:
                return json.dumps({"status":"processing"})
        else:
            return json.dumps({"status":"unavailable"}),404
    else:
        return json.dumps({"status":"unavailable"}),404

@main.route("/metadata")
def info():
    video_db = mongo.db.lotus
    if request.args:
        args = request.args
        drive= args.get("id")
        query = video_db.find_one({"_id":ObjectId(drive)})
        if query:
            if "info" in query.keys():
                return json.dumps(fetchFileInfo(query["info"]["file_path"]))
            if "file_path" in query.keys():
                return json.dumps(fetchFileInfo(query["file_path"]))
            else:
                return json.dumps({"status":"processing"})
        else:
            return json.dumps({"status":"unavailable"}),404
    else:
        return json.dumps({"status":"unavailable"}),404

@main.route("/<path:path>")
def files(path):
    return send_from_directory("./",path)

def download_file(streamable):
    with streamable as stream:
        stream.raise_for_status()
        for chunk in stream.iter_content(chunk_size=100000):
            yield chunk


def _proxy(request,requestsurl):
    resp = requests.request(method=request.method,url=requestsurl,headers={key: value for (key, value) in request.headers if key != 'Host'},data=request.get_data(), cookies=request.cookies,allow_redirects=False,stream=True)
    headers = [(name, value) for (name, value) in resp.raw.headers.items()]

    return Response(download_file(resp), resp.status_code, headers)


if __name__ == "__main__":
    main.run(debug=True,port=8000)
    


