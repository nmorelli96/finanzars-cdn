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

		const { sortConfig } = this.props;

		let sortedBancos = [...bancos]

		if (sortConfig !== null) {
			sortedBancos.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? 1 : -1;
				}
				return 0;
			});
			//console.log(sortConfig)
		}

		return (
			<div id="bancosContainer">
				<div id="bancosTitle">Bancos</div>
				<table id="bancosTable">
					<thead>
						<tr id="bancosHeader">
							<th>
								<button type="button" onClick={() => this.props.sortByEntidad()}>
									Entidad <i class="fa-solid fa-sort fa-xs"></i>
								</button>
							</th>
							<th>
								<button type="button" onClick={() => this.props.sortByCompra()}>
									Compra <i class="fa-solid fa-sort fa-xs"></i>
								</button>
							</th>
							<th>
								<button type="button" onClick={() => this.props.sortByVenta()}>
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

class Crypto extends React.Component {
	render() {

		const {
			binanceUSDTBuy,
			binanceUSDTSell,
			binanceDAIBuy,
			binanceDAISell,
			cryptos
		} = this.props;

		let sortedCryptos = [...cryptos]

		return (
			<div>
				<div id="cryptoContainer">
					<div id="cryptoTitle">Crypto</div>
					<table id="cryptoTable">
						<thead>
							<tr id="cryptoHeader">
								<th>
									<button type="button" onClick={() => this.props.sortByEntidad()}>
										Exchange <i class="fa-solid fa-sort fa-xs"></i>
									</button>
								</th>
								<th>
									<button type="button" onClick={() => this.props.sortByVenta()}>
										Coin <i class="fa-solid fa-sort fa-xs"></i>
									</button>
								</th>
								<th>
									<button type="button" onClick={() => this.props.sortByCompra()}>
										Compra <i class="fa-solid fa-sort fa-xs"></i>
									</button>
								</th>
								<th>
									<button type="button" onClick={() => this.props.sortByCompra()}>
										Venta <i class="fa-solid fa-sort fa-xs"></i>
									</button>
								</th>
								<th>
									<button type="button" onClick={() => this.props.sortByCompra()}>
										Hora <i class="fa-solid fa-sort fa-xs"></i>
									</button>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Binance P2P</td>
								<td>{binanceUSDTBuy.coin}</td>
								<td>{parseFloat(binanceUSDTSell.precio).toFixed(2)}</td>
								<td>{parseFloat(binanceUSDTBuy.precio).toFixed(2)}</td>
								<td>-</td>
							</tr>
							<tr>
								<td>Binance P2P</td>
								<td>{binanceDAIBuy.coin}</td>
								<td>{parseFloat(binanceDAISell.precio).toFixed(2)}</td>
								<td>{parseFloat(binanceDAIBuy.precio).toFixed(2)}</td>
								<td>-</td>
							</tr>
							{sortedCryptos.map(exchange => (
							<tr key={exchange.id}>
								<td>{exchange.banco}</td>
								<td>{exchange.coin}</td>
								<td>{exchange.compra.toFixed(2)}</td>
								<td>{exchange.venta.toFixed(2)}</td>
								<td
									title={new Date(exchange.time * 1000).toLocaleString('es-AR')}
									style={{ color: new Date().getTime() - (exchange.time * 1000) > 3600000 ? 'red' : 'green' }}>
									{new Date(exchange.time * 1000).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}{/*, {new Date(banco.time * 1000).toLocaleDateString('es-AR')}*/}
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

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fiat: { "oficial": 0, "solidario": 0, "blue": 0, "ccb": 0, "mep": 0, "ccl": 0, "mepgd30": 0, "cclgd30": 0, "time": 0 },
			bancos: [],
			binanceUSDTBuy: [],
			binanceUSDTSell: [],
			binanceDAIBuy: [],
			binanceDAISell: [],
			cryptos: [],
			sortConfig: { key: 'ventaTot', direction: 'ascending' }
		};
		this.sortByEntidad = this.sortByEntidad.bind(this);
		this.sortByCompra = this.sortByCompra.bind(this);
		this.sortByVenta = this.sortByVenta.bind(this);
	}

	componentDidMount() {
		document.addEventListener("DOMContentLoaded", this.loadAPIs());
	}

	loadAPIs() {
		this.getFiatFromAPI();
		this.getBancosFromAPI();
		this.getBinanceP2PFromAPI('buy', 'usdt');
		this.getBinanceP2PFromAPI('sell', 'usdt')
		this.getBinanceP2PFromAPI('buy', 'dai');
		this.getBinanceP2PFromAPI('sell', 'dai');
		this.getCryptosFromAPIs();
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
					id: i + 1,
					banco: exchanges[i],
					coin: coins[i],
					compra: api[i].totalBid,
					venta: api[i].totalAsk,
					time: api[i].time
				})
			}
			//console.log(newApi)
			this.setState((state) => ({
				cryptos: newApi
			}));
			//console.log(this.state);
		})
			.catch((error) => {
				console.error(error);
			});
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
						//traderTipo: api[keyValue[i]].advertiser.userType,
						metodo: api[keyValue[i]].adv.tradeMethods["0"].tradeMethodName,
						precio: api[keyValue[i]].adv.price,
						coin: coin.toUpperCase()
					})
				}
				//let filteredApi = newApi.filter(elem => elem.metodo !== "Cash in Person");
				let filteredApi = newApi.find(elem => !elem.metodo.includes("Cash"))
				if (operation === 'buy' && coin === 'usdt') {
					this.setState((state) => ({
						binanceUSDTBuy: filteredApi
					}));
				} else if (operation === 'sell' && coin === 'usdt') {
					this.setState((state) => ({
						binanceUSDTSell: filteredApi
					}));
				} else if (operation === 'buy' && coin === 'dai') {
					this.setState((state) => ({
						binanceDAIBuy: filteredApi
					}));
				} else if (operation === 'sell' && coin === 'dai') {
					this.setState((state) => ({
						binanceDAISell: filteredApi
					}));
				}
				//console.log(newApi);
				//console.log(filteredApi);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	sortByEntidad() {
		if (this.state.sortConfig.key === 'banco' && this.state.sortConfig.direction === 'ascending') {
			this.setState({
				sortConfig: { key: 'banco', direction: 'descending' }
			})
		} else {
			this.setState({
				sortConfig: { key: 'banco', direction: 'ascending' }
			})
		}
	}

	sortByCompra() {
		if (this.state.sortConfig.key === 'compra' && this.state.sortConfig.direction === 'descending') {
			this.setState({
				sortConfig: { key: 'compra', direction: 'ascending' }
			})
		} else {
			this.setState({
				sortConfig: { key: 'compra', direction: 'descending' }
			})
		}
	}

	sortByVenta() {
		if (this.state.sortConfig.key === 'ventaTot' && this.state.sortConfig.direction === 'ascending') {
			this.setState({
				sortConfig: { key: 'ventaTot', direction: 'descending' }
			})
		} else {
			this.setState({
				sortConfig: { key: 'ventaTot', direction: 'ascending' }
			})
		}
	}

	render() {
		return (
			<div id="app-container">

				<Fiat
					fiat={this.state.fiat} />

				<Bancos
					bancos={this.state.bancos}
					sortConfig={this.state.sortConfig}
					sortByEntidad={this.sortByEntidad}
					sortByCompra={this.sortByCompra}
					sortByVenta={this.sortByVenta} />

				<Crypto
					binanceUSDTBuy={this.state.binanceUSDTBuy}
					binanceUSDTSell={this.state.binanceUSDTSell}
					binanceDAIBuy={this.state.binanceDAIBuy}
					binanceDAISell={this.state.binanceDAISell} 
					cryptos={this.state.cryptos}/>

			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
