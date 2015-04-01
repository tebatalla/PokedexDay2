Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail"
  },

  pokemonDetail: function (id, callback) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
    } else {
      this._pokemonDetail = new Pokedex.Views.PokemonDetail({
        model: this._pokemonIndex.collection.get(id)
      });
      $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el);
      this._pokemonDetail.refreshPokemon({
        success: callback
      });
      $('.toy-detail').empty();
    }
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon({
      success: callback
    });
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
    this.pokemonForm();
  },

  toyDetail: function (pokemonId, toyId) {
    if(!this._pokemonDetail) {
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
    } else {
      var toyDetailView = new Pokedex.Views.ToyDetail({
        model: this._pokemonDetail.model.toys().get(toyId),
        pokemon: this._pokemonIndex.collection
      });
      toyDetailView.render();
      $('#pokedex .toy-detail').html(toyDetailView.$el);
    }
  },

  pokemonForm: function () {
    var pokemonFormView =  new Pokedex.Views.PokemonForm({
      model: new Pokedex.Models.Pokemon(),
      collection: this._pokemonIndex.collection
    });

    pokemonFormView.render();
    $('#pokedex .pokemon-form').html(pokemonFormView.$el);
  }
});

$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
