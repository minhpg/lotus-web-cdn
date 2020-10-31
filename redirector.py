from flask import Flask, redirect, request


app = Flask(__name__)
new_url = 'https://lotus.kyunkyun.net'
@app.route('/')
def root():
    return redirect(new_url, code=302)


@app.route('/<path:page>')
def anypage(page):
    args = request.args
    queries = args.items()
    print(queries)
    query="?"
    for i in queries:
         value =i[0]+"="+i[1]+"&"
         query+=value 
    return redirect(new_url+"/"+page+query)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug = True)
