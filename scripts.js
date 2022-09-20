class Fiat extends React.Component {
	// console.log(props);
	render() {

		const { fiat } = this.props;

		return (
			<div id="fiatContainer">
				<div id="fiatTitle">Dólar Fiat</div>
				<table id="fiatTable">
					<thead>
						<th
							title={new Date(fiat.time * 1000).toLocaleString('es-AR')}
							style={{ color: new Date().getTime() - (fiat.time * 1000) > 3600000 ? 'red' : 'green' }}>
							{new Date(fiat.time * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
						</th>
						<th>Venta</th>
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
			console.log(sortConfig)
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
									{new Date(banco.time * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}{/*, {new Date(banco.time * 1000).toLocaleDateString('es-AR')}*/}
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

// class Crypto extends React.Component {
// 	render() {
// 		return (
// 			<div id="bancosContainer">
// 				<div id="bancosTitle">Bancos</div>
// 				<div id="bancosGrid">
// 					<div>Plus </div><div>{this.props.plus}</div>
// 					<div>CambioAR </div><div>{this.props.cambioar}</div>
// 					<div>Davsa </div><div>{this.props.davsa}</div>
// 					<div>Brubank </div><div>{this.props.brubank}</div>
// 					<div>Reba </div><div>{this.props.reba}</div>
// 					<div>Nación </div><div>{this.props.bna}</div>
// 					<div>Provincia </div><div>{this.props.bapro}</div>
// 					<div>Ciudad </div><div>{this.props.ciudad}</div>
// 					<div>Galicia </div><div>{this.props.galicia}</div>
// 					<div>BBVA </div><div>{this.props.bbva}</div>
// 					<div>Santander </div><div>{this.props.santander}</div>
// 					<div>Macro </div><div>{this.props.macro}</div>
// 					<div>HSBC </div><div>{this.props.hsbc}</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fiat: { "oficial": 0, "solidario": 0, "blue": 0, "ccb": 0, "mep": 0, "ccl": 0, "mepgd30": 0, "cclgd30": 0, "time": 0 },
			bancos: [],
			sortConfig: { key: null, direction: 'ascending' }
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.getFiatFromAPI = this.getFiatFromAPI.bind(this);
		this.getBancosFromAPI = this.getBancosFromAPI.bind(this);
		this.sortByEntidad = this.sortByEntidad.bind(this);
		this.sortByCompra = this.sortByCompra.bind(this);
		this.sortByVenta = this.sortByVenta.bind(this);
	}

	componentDidMount() {
		document.addEventListener("DOMContentLoaded", this.getFiatFromAPI());
		document.addEventListener("DOMContentLoaded", this.getBancosFromAPI());
	}

	getFiatFromAPI() {
		return fetch('https://criptoya.com/api/dolar')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState((state) => ({
					fiat: responseJson
				}));
				console.log(this.state);
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
				console.log(newApi)
				this.setState((state) => ({
					bancos: responseJson,
					bancos: filteredApi
				}));
				console.log(this.state);
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	// getBinanceP2PFromAPI() {
	// 	return fetch('https://criptoya.com/api/binancep2p/buy/usdt/ars/20')
	// 		.then((response) => response.json())
	// 		.then((responseJson) => {
	// 			this.setState((state) => ({
	// 			}));
	// 			console.log(this.state);
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// }

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

			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
