import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: 10
    }
  }

  fetchPokemon() {
    clearInterval(this.timer);
    this.setState({ time: 10 })
    //document.getElementById('timer').classList.add('visible')
    //document.getElementById('timer').classList.remove('hidden')
    document.getElementById('name').classList.add('hidden')
    document.getElementById('name').classList.remove('visible')
    document.getElementById('image').classList.add('dark')
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
    this.timer = setInterval(() => {
      if (this.state.time >= 1) this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.time <= 0) {
      //document.getElementById('timer').classList.add('hidden')
      //document.getElementById('timer').classList.remove('visible')
      document.getElementById('name').classList.add('visible')
      document.getElementById('name').classList.remove('hidden')
      document.getElementById('image').classList.remove('dark')
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 id='timer' className={'timer'} >{this.state.time}</h1>
        <div className={'pokeWrap'}>
          <img id='image' className={'pokeImg', 'dark'} src={this.state.pokeSprite} />
          <h1 id='name' className={'pokeName', 'hidden'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;