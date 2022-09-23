function sortComponent(sortConfig, sortedArray) {
	if (sortConfig !== null) {
		sortedArray.sort((a, b) => {
			if (a[sortConfig.key] < b[sortConfig.key]) {
				return sortConfig.direction === 'ascending' ? -1 : 1;
			}
			if (a[sortConfig.key] > b[sortConfig.key]) {
				return sortConfig.direction === 'ascending' ? 1 : -1;
			}
			return 0;
		});
	}
}

class Fiat extends React.Component {
	// console.log(props);
	render() {

		const { fiat } = this.props;

		return (
			<div id="fiatContainer">
				<div id="fiatTitle">Dólar Fiat</div>
				<table id="fiatTable">
					<thead>
						<tr id="fiatHeader">
							<th
								title={new Date(fiat.time * 1000).toLocaleString('es-AR')}
								style={{ color: new Date().getTime() - (fiat.time * 1000) > 3600000 ? 'red' : 'green' }}>
								{new Date(fiat.time * 1000).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}
							</th>
							<th><button style={{ cursor: 'default' }}>Venta</button></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Oficial</td><td>{fiat.oficial.toFixed(2)}</td>
						</tr>
						<tr>
							<td>Solidario</td><td>{fiat.solidario.toFixed(2)}</td>
						</tr>
						<tr>
							<td>Blue</td><td>{fiat.blue.toFixed(2)}</td>
						</tr>
						<tr>
							<td>MEP</td><td>{fiat.mep.toFixed(2)}</td>
						</tr>
						<tr>
							<td>CCL</td><td>{fiat.ccl.toFixed(2)}</td>
						</tr>

					</tbody>
				</table>
			</div>
		);
	}
}

class Bancos extends React.Component {
	render() {

		const { bancos } = this.props;

		const { sortBancosConfig } = this.props;

		let sortedBancos = [...bancos]

		sortComponent(sortBancosConfig, sortedBancos);

		return (
			<div id="bancosContainer">
				<div id="bancosTitle">Bancos</div>
				<table id="bancosTable">
					<thead>
						<tr id="bancosHeader">
							<th>
								<button type="button" onClick={() => this.props.sortBancos('banco')}>
									Entidad <i class="fa-solid fa-sort fa-xs"></i>
								</button>
							</th>
							<th>
								<button type="button" onClick={() => this.props.sortBancos('compra')}>
									Compra <i class="fa-solid fa-sort fa-xs"></i>
								</button>
							</th>
							<th>
								<button type="button" onClick={() => this.props.sortBancos('ventaTot')}>
									Venta <i class="fa-solid fa-sort fa-xs"></i>
								</button>
							</th>
							<th><button style={{ cursor: 'default' }}>Hora</button></th>
						</tr>
					</thead>
					<tbody>
						{sortedBancos.map(banco => (
							<tr key={banco.id}>
								<td>{banco.banco.toUpperCase()}</td>
								<td>{banco.compra.toFixed(2)}</td>
								<td>{banco.ventaTot.toFixed(2)}</td>
								<td
									title={new Date(banco.time * 1000).toLocaleString('es-AR')}
									style={{ color: new Date().getTime() - (banco.time * 1000) > 3600000 ? 'red' : 'green' }}>
									{new Date(banco.time * 1000).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}{/*, {new Date(banco.time * 1000).toLocaleDateString('es-AR')}*/}
								</td>
							</tr>
						))}
						<tr>
							<td></td>
						</tr>
					</tbody>
				</table>

			</div>
		);
	}
}

let binance = [];
class Crypto extends React.Component {
	render() {

		const {
			binance,
			cryptos,
			sortCryptoConfig
		} = this.props;

		let sortedCryptos = [...binance].concat([...cryptos])
		//console.log(sortedCryptos)

		sortComponent(sortCryptoConfig, sortedCryptos);

		return (
			<div>
				<div id="cryptoContainer">
					<div id="cryptoTitle">Crypto</div>
					<table id="cryptoTable">
						<thead>
							<tr id="cryptoHeader">
								<th>
									<button type="button" onClick={() => this.props.sortCrypto('banco')}>
										Exchange <i class="fa-solid fa-sort fa-xs"></i>
									</button>
								</th>
								<th>
									<button type="button" onClick={() => this.props.sortCrypto('coin')}>
										Coin <i class="fa-solid fa-sort fa-xs"></i>
									</button>
								</th>
								<th>
									<button type="button" onClick={() => this.props.sortCrypto('compra')}>
										Compra <i class="fa-solid fa-sort fa-xs"></i>
									</button>
								</th>
								<th>
									<button type="button" onClick={() => this.props.sortCrypto('venta')}>
										Venta <i class="fa-solid fa-sort fa-xs"></i>
									</button>
								</th>
								<th>
									<button type="button">
										Hora
									</button>
								</th>
							</tr>
						</thead>
						<tbody>
							{sortedCryptos.map(exchange => (
								<tr key={exchange.id}>
									<td>{exchange.banco}</td>
									<td>{exchange.coin}</td>
									<td>{exchange.compra}</td>
									<td>{exchange.venta}</td>
									<td
										title={new Date(exchange.time * 1000).toLocaleString('es-AR')}
										style={{ color: new Date().getTime() - (exchange.time * 1000) > 3600000 ? 'red' : 'green' }}>
										{new Date(exchange.time * 1000).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

let binanceDAI = {};
let binanceUSDT = {};

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fiat: { "oficial": 0, "solidario": 0, "blue": 0, "ccb": 0, "mep": 0, "ccl": 0, "mepgd30": 0, "cclgd30": 0, "time": 0 },
			bancos: [],
			binance: [],
			cryptos: [],
			sortBancosConfig: { key: 'ventaTot', direction: 'ascending' },
			sortCryptoConfig: { key: 'venta', direction: 'ascending' }
		};
		this.sortBancos = this.sortBancos.bind(this);
		this.sortCrypto = this.sortCrypto.bind(this);
	}

	componentDidMount() {
		document.addEventListener("DOMContentLoaded", this.loadAPIs());
		document.addEventListener("DOMContentLoaded", this.reloadPage(10));
	}

	loadAPIs() {
		this.getFiatFromAPI();
		this.getBancosFromAPI();
		this.getBinanceP2PFromAPI('buy', 'USDT');
		this.getBinanceP2PFromAPI('sell', 'USDT')
		this.getBinanceP2PFromAPI('buy', 'DAI');
		this.getBinanceP2PFromAPI('sell', 'DAI');
		this.getCryptosFromAPIs();
	}

	getFiatFromAPI() {
		return fetch('https://criptoya.com/api/dolar')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState((state) => ({
					fiat: responseJson
				}));
				//console.log(this.state);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getBancosFromAPI() {
		return fetch('https://criptoya.com/api/bancostodos')
			.then((response) => response.json())
			.then((responseJson) => {
				let api = responseJson
				let keyValue = Object.keys(api);
				let newApi = []
				for (let i = 0; i < Object.keys(api).length; i++) {
					newApi.push({
						id: i + 1,
						banco: keyValue[i],
						compra: api[keyValue[i]].bid,
						ventaTot: api[keyValue[i]].totalAsk,
						time: api[keyValue[i]].time
					})
				}
				let filteredApi = newApi.filter(elem => elem.time * 1000 > ((new Date().getTime()) - 432000000))
				//console.log(filteredApi)
				this.setState((state) => ({
					bancos: filteredApi
				}));
				//console.log(this.state);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getBinanceP2PFromAPI(operation, coin) {
		return fetch(`https://criptoya.com/api/binancep2p/${operation}/${coin}/ars/8`)
			.then((response) => response.json())
			.then((responseJson) => {
				let api = responseJson.data
				let keyValue = Object.keys(api);
				let newApi = []
				for (let i = 0; i < Object.keys(api).length; i++) {
					newApi.push({
						id: i,
						trader: api[keyValue[i]].advertiser.nickName,
						tradeType: operation,
						//traderTipo: api[keyValue[i]].advertiser.userType,
						metodo: api[keyValue[i]].adv.tradeMethods["0"].tradeMethodName,
						precio: api[keyValue[i]].adv.price,
						coin: coin
					})
				}
				let filteredApi = newApi.find(elem => !elem.metodo.includes("Cash"))
				if (coin === 'USDT') {
					binanceUSDT['id'] = 1;
					binanceUSDT['banco'] = "Binance P2P";
					binanceUSDT['coin'] = coin;
					binanceUSDT['time'] = new Date().getTime() / 1000;
					if (operation === 'buy') {
						binanceUSDT['venta'] = Number.parseFloat(filteredApi.precio).toFixed(2)
					} else if (operation === 'sell') {
						binanceUSDT['compra'] = Number.parseFloat(filteredApi.precio).toFixed(2)
					}
				} else if (coin === 'DAI') {
					binanceDAI['id'] = 2;
					binanceDAI['banco'] = "Binance P2P";
					binanceDAI['coin'] = coin;
					binanceDAI['time'] = new Date().getTime() / 1000;
					if (operation === 'buy') {
						binanceDAI['venta'] = Number.parseFloat(filteredApi.precio).toFixed(2)
					} else if (operation === 'sell') {
						binanceDAI['compra'] = Number.parseFloat(filteredApi.precio).toFixed(2)
					}
				}
				if (binance.length < 2) {
					binance.push(binanceUSDT)
					binance.push(binanceDAI)
				}
				//console.log(binance)

				this.setState((state) => ({
					binance: binance
				}));
				//console.log(newApi);
				//console.log(filteredApi);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getCryptosFromAPIs() {
		return Promise.all([
			fetch('https://criptoya.com/api/belo/usdt/ars').then(resp => resp.json()),
			fetch('https://criptoya.com/api/buenbit/dai/ars').then(resp => resp.json()),
			fetch('https://criptoya.com/api/lemoncash/usdt').then(resp => resp.json()),
			fetch('https://criptoya.com/api/ripio/usdc').then(resp => resp.json()),
			fetch('https://criptoya.com/api/satoshitango/dai/ars').then(resp => resp.json()),
		]).then((responseJson) => {
			let exchanges = ['Belo', 'Buenbit', 'Lemon', 'Ripio', 'SatoshiTango'];
			let coins = ['USDT', 'DAI', 'USDT', 'USDC', 'DAI'];
			let api = responseJson;
			let newApi = [];
			for (let i = 0; i < Object.keys(api).length; i++) {
				newApi.push({
					id: i + 3,
					banco: exchanges[i],
					coin: coins[i],
					compra: api[i].totalBid.toFixed(2),
					venta: api[i].totalAsk.toFixed(2),
					time: api[i].time
				})
			}
			this.setState((state) => ({
				cryptos: newApi
			}));
			console.log(newApi)
			//console.log(this.state);
		})
			.catch((error) => {
				console.error(error);
			});
	}

	sortBancos(by) {
		if (this.state.sortBancosConfig.key === by && this.state.sortBancosConfig.direction === 'ascending') {
			this.setState({
				sortBancosConfig: { key: by, direction: 'descending' }
			})
		} else {
			this.setState({
				sortBancosConfig: { key: by, direction: 'ascending' }
			})
		}
	}


	sortCrypto(by) {
		if (this.state.sortCryptoConfig.key === by && this.state.sortCryptoConfig.direction === 'ascending') {
			this.setState({
				sortCryptoConfig: { key: by, direction: 'descending' }
			})
		} else {
			this.setState({
				sortCryptoConfig: { key: by, direction: 'ascending' }
			})
		}
	}

	reloadPage(minutes) {
		window.setTimeout(function () {
			location.reload();
		}, minutes * 60000);
	}

	render() {
		return (
			<div id="app-container">

				<Fiat
					fiat={this.state.fiat} />

				<Bancos
					bancos={this.state.bancos}
					sortBancosConfig={this.state.sortBancosConfig}
					sortBancos={this.sortBancos} />

				<Crypto
					binance={this.state.binance}
					cryptos={this.state.cryptos}
					sortCryptoConfig={this.state.sortCryptoConfig}
					sortCrypto={this.sortCrypto} />

			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
