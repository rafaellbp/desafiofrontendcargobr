import './Apresentacao.css'
import React from 'react'
import Main from '../templates/Main'
import {Grid, Segment, Divider, Image} from 'semantic-ui-react'

export default props => (
    <Main icon='child' title='Apresentação' subtitle='História resumida | Portifólio' >
        <Segment>
            <Grid celled='internally'>
                <Grid.Row columns={2}>
                    <Grid.Column width={8} >
                        <h4>Prezados,</h4>
                        <p>Meu nome é Rafael Almeida Silva Caseiro, tenho 33 anos, sou casado e tenho 1 filho de 8 meses. Moro em Ribeirão Preto, onde cursei Ciências da Computação na Universidade Paulista em (ano de 2008 a 2013). </p>
                        <p>Trabalhei na empresa Nestle Business Service (NBS) de 2007 a 2014, exercendo a função de analista de sistemas em contas a receber. Tive a oportunidade de desenvolver ferramentas para automatizar processos e diminuição de custos para a empresa. </p>
                        <p>No ano de 2014 dediquei-me a expansão de projetos pessoais com a criação da Zenbytes com foco no desenvolvimento de sistemas web – durante estes quatro anos tive a oportunidade de desenvolver diversos projetos, sempre como programador full-stack. Grande parte das aplicações foram utilizados NodeJs no backend e Angularjs no frontend.</p>
                        <p>Tenho conhecimento em outros frameworks frontend como, Reacjs, ReactNative e Angular 2</p>
                        <p>Agradeço a oportunidade de participar deste processo.</p>
                        <p>A Stack utilizado para o desenvolvimento deste desafio foi React/react.semantic-ui.</p>
                        <p>Att,</p>
                        <p>Rafael Caseiro</p>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h1>Alguns projetos publicos</h1>
                        <Divider fitted />
                        <Grid celled='internally' textAlign='center'>
                            <Grid.Row columns={2}>
                                <Grid.Column width={8}>
                                    <Image
                                        src='https://odacat.com.br/img/logo.png'
                                        as='a'
                                        size='medium'
                                        href='https://odacat.com.br'
                                        target='_blank'
                                    />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Image
                                        src='https://medilar.com.br/img/logo-medilar.png'
                                        as='a'
                                        size='medium'
                                        href='https://medilar.com.br/#/'
                                        target='_blank'
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column width={8}>
                                    <Image
                                        src='http://www.citypao.com.br/img/logo.png'
                                        as='a'
                                        size='medium'
                                        href='http://www.citypao.com.br/'
                                        target='_blank'
                                    />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Image
                                        src='https://zenbytes.com.br/img/logoHeader.png'
                                        as='a'
                                        size='medium'
                                        href='https://zenbytes.com.br/'
                                        target='_blank'
                                    />
                                    <p>Mais projetos no site da zenbytes</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </Main>
)