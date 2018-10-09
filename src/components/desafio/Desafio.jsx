import './Desafio.css'
import React, {Component} from 'react'
import axios from 'axios'
import Main from '../templates/Main'
import ImageLoader from 'react-loading-image'
import InputMask from 'react-input-mask'
import {Checkbox, Table, Pagination, Button, Header, Step ,Modal, Icon, Grid, Message, Form, Loader} from 'semantic-ui-react'

const headerProps = {
    icon:'hand spock outline',
    title:'Desafio',
    subtitle:'Desafio Frontend Cargobr'
};

const baseUrl = 'https://api.github.com/search/users?q=google+in:organization';

export default class Desafio extends Component{

    //set initial state
    constructor(props){
        super(props);
        this.state = {
            list: [],
            page: parseInt(this.props.match.params.page),
            query: this.props.match.params.query,
            total: parseInt(this.props.match.params.page),
            progress: true,
            allSelected: false,
            total_count: 0,
            selectedItems: [],
            totalAmount: 0,
            step: 'list',
            card: {
                numero: '',
                vencimento: '',
                nome: '',
                ccv: ''
            },
            flipped:'',
            flag:'',
            warningForm:false,
            erro:false
        }
    }

    //request of data and set state values checking selected items if a page change call
    componentWillMount(pageNumber){
        if(pageNumber)this.setState({page:parseInt(pageNumber), list:[], progress:true, allSelected:false});
        axios(`${baseUrl}&page=${pageNumber ? pageNumber : this.state.page}`)
            .then(res => {
                let link = res.headers.link ? res.headers.link.split(',') : [];
                let total = this.props.match.params.page;
                link.forEach((item) => {
                    if(item.indexOf('rel="last"') > -1)
                        total = item.substring(item.indexOf('&page=')+6,item.indexOf('>',item.indexOf('&page=')));
                });
                total = parseInt(total);
                this.setState({list: res.data.items.map(item => ({...item,checked:Desafio.checkIfisSelected(this.state.selectedItems,item)})), total, progress:false, total_count:res.data.total_count})
                this.setState({allSelected:Desafio.checkIfisAllSelected(this.state.list)});
            }).catch((erro) => {
                this.setState({erro:erro.message});
            })

    }

    //Functions/////////////////////////

    //set a new history with a new page param and call request data
    onPageChange = (e, data) => {
        this.props.history.push(`/desafio/${data.activePage}`);
        this.componentWillMount(data.activePage);
        window.scrollTo(0, 0);
    };

    //set as true or false al documents
    selectAll = (e) => {
        const list = this.state.list.map(item => ({...item,checked:e.target.checked}));
        this.setState({list,allSelected:e.target.checked});
        list.forEach((item) => this.pushOrSpliceSelectedItem(this.state.selectedItems, item))
    };

    //set a specific item as true os false
    selectOne = (e, index) => {
        let allSelected = true;
        const list = this.state.list;
        list[index].checked = e.target.checked;
        list.forEach((item)=>{
            if(!item.checked)
                allSelected = false;
        });
        this.pushOrSpliceSelectedItem(this.state.selectedItems, list[index]);
        this.setState({allSelected, list});

    };

    //return the amount of all selected items
    getTotalAmount(list){
        let sum = 0;
        list.forEach((item)=> sum += parseFloat((Math.round(item.score * 100) / 100)));
        return sum.toFixed(2).toString().replace('.',',');
    }

    //add or remove items from selectedItems array
    pushOrSpliceSelectedItem = (selectedItems, item) =>{
        let push = true;
        let list = [...selectedItems];
        list.forEach((value, index) => {
            if(value.id === item.id){
                push = false;
                if(!item.checked){
                    selectedItems.splice(index, 1)
                }
            }
        });
        if(push) {
            selectedItems.push(item);
            this.setState({selectedItems})
        }
    };

    //change the state of step component
    setNextStep = (step) =>{
        if(step === 'end'){
            let validation = true;
            for(const item in this.state.card){
                if(!this.state.card[item]) validation = false;
            }
            if(validation){
                this.setState({step})
            }else{
                this.setState({warningForm:true});
                setTimeout(()=> this.setState({warningForm:false}),3000)
            }
        }else{
            this.setState({step})
        }

    };

    //get card flag to change the card image and change input state
    getCardBrand = (event) =>{
        let card = {...this.state.card};
        card.numero = event.target.value;
        let t = event.target.value;
        this.setState({card});
        if (!t) return null;
        t = t.replace(/[^0-9]/g, "");
        let e, r = {
                elo: ["636368", "438935", "504175", "451416", "636297", "5067", "4576", "4011"],
                discover: ["6011", "622", "64", "65"],
                diners_club: ["301", "305", "36", "38"],
                american_express: ["34", "37"],
                aura: ["50"],
                jcb: ["35"],
                hipercard: ["38", "60"],
                visa: ["4"],
                mastercard: ["5"]
            },
            n = 0;
        for (let i in r)
            for (let a = 0; a < r[i].length; a++) {
                let s, o, c = r[i][a];
                let z = ((c.length > t.length) ? (s = t, o = c.substring(0, t.length)) : (s = t.substring(0, c.length), o = c), s == o && c.length > n && (e = i, n = c.length))
            }
        const flag = e ? n <= t.length ? e : "unknown" : "unknown";
        this.setState({flag})
    };

    //change input state
    changeInputForm = (e, id) => {
        let card = {...this.state.card};
        card[id] = e.target.value;
        this.setState({card})
    };

    //flip the card image on focus or blur
    onFocurBlurForm = (f) =>{
        this.setState({flipped:f})
    };

    //static functions/////////////////////////////

    //verify if the selected item is alread added to selectedItems array
    static checkIfisSelected(selectedItems,item){
        let checked = false;
        selectedItems.forEach((value) => {
            if(value.id === item.id){
                checked = value.checked;
            }
        });
        return checked
    }

    //verify if the selected items of all the page is alread added to selectedItems array
    static checkIfisAllSelected(list){
        let checked = true;
        list.forEach((value) => {
            if(!value.checked){
                checked = false;
            }
        });
        return checked
    }

    //render functions///////////////////////

    //modal payment
    renderModal(){
        return (
            <div style={{marginBottom : '30px'}}>
                {this.state.total_count} Items encontrados
                <Modal  dimmer='blurring' trigger={<Button className='btn-shop' id='btnModal'  disabled={!this.state.selectedItems[0]}>
                    <i className='fa fa-shopping-cart'/> Finalizar compra
                    {this.state.selectedItems[0] ? <span className='shop-counter'>{this.state.selectedItems.length}</span> : null}
                </Button>} closeIcon>
                    <Header icon='cart arrow down' content='Finalizar Compra' />
                    <Modal.Content >
                        <Step.Group size='small'>
                            <Step active={this.state.step === 'list' } link onClick={() => this.setNextStep('list')}>
                                <Icon name='shopping cart' />
                                <Step.Content >
                                    <Step.Title>Items Selecionados</Step.Title>
                                    <Step.Description>Confira sua lista de pedidos</Step.Description>
                                </Step.Content>
                            </Step >
                            <Step active={this.state.step === 'payment' } link onClick={() => this.setNextStep('payment')}>
                                <Icon name='payment' />
                                <Step.Content>
                                    <Step.Title>Pagamento</Step.Title>
                                    <Step.Description>Entre com os dados do cartão</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active={this.state.step === 'end' } completed={this.state.step === 'end' }>
                                <Icon name='info' />
                                <Step.Content>
                                    <Step.Title>Confirmação</Step.Title>
                                    <Step.Description>Pagamento Finalizado</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                        <Grid divided='vertically' celled>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <h2>Quantidade de Items:</h2>
                                    <h1>{this.state.selectedItems.length}</h1>
                                </Grid.Column>
                                <Grid.Column>
                                    <h2>Valor Total</h2><h1>$ {this.getTotalAmount(this.state.selectedItems)}</h1>
                                </Grid.Column>
                                <Grid.Column>
                                    {this.state.step === 'end' ? <div><h1>Compra Efetuada com sucesso!</h1><h2>Fim do desafio!</h2></div> : null}
                                    {this.state.step !== 'end' ? <Button className='btn-next' basic color='blue' content={this.state.step === 'list' ? 'Pagamento' : this.state.step === 'payment' ? 'Pagar' : 'Sair'} icon='right arrow' labelPosition='right' onClick={() => this.setNextStep(this.state.step === 'list' ?  'payment' : this.state.step === 'payment' ? 'end' : '')} /> : null}
                                </Grid.Column>
                            </Grid.Row>
                            { this.state.step === 'list' ? (<Grid.Row columns={1}  >
                                <Grid.Column>
                                    <Table celled striped >
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Id</Table.HeaderCell>
                                                <Table.HeaderCell>Avatar</Table.HeaderCell>
                                                <Table.HeaderCell>Usuário</Table.HeaderCell>
                                                <Table.HeaderCell>Tipo</Table.HeaderCell>
                                                <Table.HeaderCell>Preço</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                this.state.selectedItems.map((item) => (
                                                    <Table.Row key={item.id}>
                                                        <Table.Cell>{item.id}</Table.Cell>
                                                        <Table.Cell>
                                                            {item.avatar_url && (
                                                                <ImageLoader
                                                                    src={item.avatar_url}
                                                                    loading={() => <Loader active inline />}
                                                                    error={() => <div>Error</div>}
                                                                />
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>{item.login}</Table.Cell>
                                                        <Table.Cell>{item.type}</Table.Cell>
                                                        <Table.Cell>$ {(Math.round(item.score * 100) / 100).toFixed(2).toString().replace('.',',')}</Table.Cell>
                                                    </Table.Row>
                                                ))
                                            }

                                        </Table.Body>
                                    </Table>
                                </Grid.Column>

                            </Grid.Row>) : null}
                            { this.state.step === 'payment' ? (<Grid.Row style={{height:'290px'}} columns={2} >
                                <Grid.Column width={6}>
                                    <Form>
                                        <Form.Field>
                                            <InputMask mask='9999 9999 9999 9999'  placeholder='Número do Cartão' onChange={(e)=> this.getCardBrand(e)} />
                                        </Form.Field>
                                        <Form.Field>
                                            <input placeholder='Nome no cartão' onChange={(e)=> this.changeInputForm(e, 'nome')} />
                                        </Form.Field>
                                        <Form.Group widths='equal'>
                                            <Form.Input fluid placeholder='Venc. MM/AA' onChange={(e)=> this.changeInputForm(e, 'vencimento')} />
                                            <Form.Input fluid placeholder='CCV' onChange={(e)=> this.changeInputForm(e, 'ccv')} onFocus={()=> this.onFocurBlurForm('flipped')} onBlur={()=> this.onFocurBlurForm('')} />
                                        </Form.Group>
                                    </Form>
                                    {this.state.warningForm ? <Message attached='bottom' warning><Icon name='exclamation circle' />Preencha todos os campos.</Message> : null}
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <div className={`card ${this.state.flipped} ${this.state.flag}`}>
                                        <div className="front">
                                            <p className="general expiration-label field">Valido ate</p>
                                            <p className="general number field">{this.state.card.numero ? this.state.card.numero : '•••• •••• •••• ••••'}</p>
                                            <p className="general expiration field">{this.state.card.vencimento ? this.state.card.vencimento : 'MM/AA'}</p>
                                            <p className="general name field">{this.state.card.nome ? this.state.card.nome : 'nome completo'}</p>
                                            <p className="american_express cvv field">{this.state.card.ccv ? this.state.card.ccv : '••••'}</p>
                                            <p className="american_express expiration-label field">Valido ate</p>
                                            <p className="american_express number field">{this.state.card.numero ? this.state.card.numero : '•••• •••• •••• ••••'}</p>
                                            <p className="american_express expiration field">{this.state.card.vencimento ? this.state.card.vencimento : 'MM/AA'}</p>
                                            <p className="american_express name field">{this.state.card.nome ? this.state.card.nome : 'nome completo'}</p>
                                        </div>
                                        <div className="back">
                                            <p className="cvv field">{this.state.card.ccv ? this.state.card.ccv : '•••'}</p>
                                        </div>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>) : null}
                        </Grid>
                    </Modal.Content>

                </Modal>

            </div>
        )
    }

    //table data
    renderTable(){
        return(
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Checkbox id="cbAll" checked={this.state.allSelected} onChange={(e) => this.selectAll(e)} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Avatar</Table.HeaderCell>
                        <Table.HeaderCell>Usuário</Table.HeaderCell>
                        <Table.HeaderCell>Tipo</Table.HeaderCell>
                        <Table.HeaderCell>Preço</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        this.state.progress ? ( <Table.Row>
                            <Table.Cell colSpan='6'>
                                <Message icon>
                                    <Icon name='circle notched' loading />
                                    <Message.Content>
                                        <Message.Header>Aguarde</Message.Header>
                                        Localizando Items.
                                    </Message.Content>
                                </Message>
                            </Table.Cell>
                        </Table.Row>) : null
                    }

                    {!this.state.progress ? this.renderRows() : null}
                </Table.Body>
            </Table>
        )
    }

    //rows from request data
    renderRows(){
        return this.state.list.map((item, index) => {

            return (
                <Table.Row key={item.id}>
                    <Table.Cell>
                        <Checkbox id={`cdItem${item.id}`} checked={item.checked} onChange={(e) => this.selectOne(e, index)} />
                    </Table.Cell>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>
                        {item.avatar_url && (
                            <ImageLoader
                                src={item.avatar_url}
                                loading={() => <Loader active inline />}
                                error={() => <div>Error</div>}
                            />
                        )}
                    </Table.Cell>
                    <Table.Cell>{item.login}</Table.Cell>
                    <Table.Cell>{item.type}</Table.Cell>
                    <Table.Cell>$ {(Math.round(item.score * 100) / 100).toFixed(2).toString().replace('.',',')}</Table.Cell>
                </Table.Row>
            )
        })
    }

    //pagination
    renderPagination() {
        return (

            <div>
                <Pagination defaultActivePage={this.state.page} totalPages={this.state.total} onPageChange={this.onPageChange} />
            </div>
        );
    }

    //main render
    render(){
        return (
            <Main {...headerProps}>
                {
                    this.state.erro ?
                        <Message negative>
                            <Message.Header>{this.state.erro}</Message.Header>
                        </Message> : null
                }
                {!this.state.progress && !this.state.erro ? (this.renderModal()) : null}
                {!this.state.erro ?  this.renderTable() : null}
                {!this.state.progress && !this.state.erro ? this.renderPagination() : null}

            </Main>

        )
    }
}