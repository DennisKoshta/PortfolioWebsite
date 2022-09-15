from flask import Flask, request, render_template, flash, Response, make_response
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from yahoo_fin import stock_info as si

import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')

import io

app = Flask(__name__)
default_ticker = 'SPY'
default_window = 356

@app.route("/")
def index():
    return render_template('index.html')   

@app.route('/MotionTracking')
def MotionTracking():
    return render_template('MotionTracking.html')

@app.route('/CartPole')
def CartPole():
    return render_template('CartPole.html')

@app.route('/ArtCanvas')
def ArtCanvas():
    return render_template('ArtCanvas.html')

@app.route('/StockPlot', methods=("POST", "GET"))
def StockPlot():
    global ticker, window

    if request.method == 'POST':
        ticker = request.form.get('tickerInput')
        window = int(request.form.get('windowInput'))

    return render_template('StockPlot.html')

@app.route('/plot.png', methods=['GET', 'POST'])
def plot_png():
    try:
        fig = plot_stock_from_si(ticker, window)
    except:
        fig = plot_stock_from_si(default_ticker, default_window)

    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)

    return Response(output.getvalue(), mimetype='image/png')

def plot_stock_from_si(ticker, window):
    try:
        df = si.get_data(ticker)
    except:
        fig, ax = plt.subplots(figsize=(16, 10))
        plt.text(0.5, 0.5,'Sorry, this stock is not available right now, please try another.', horizontalalignment='center', verticalalignment='center', transform = ax.transAxes)
        fig.suptitle(f"{ticker.upper()} was not found", fontsize=24)
        return fig

    fig, ax = plt.subplots(figsize=(16, 10))

    plt.plot(df['adjclose'][-window:], c='b')

    plt.xlabel("Date")
    plt.ylabel("Price ($)")

    fig.suptitle(f"{ticker.upper()} Stock Prices: Past {window} Days", fontsize=24)

    return fig

if __name__ == "__main__":
	# start the flask app
    app.run(debug=True)