Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
  },

  addPokemonToList: function (pokemon) {
    var content = JST["pokemonListItem"]({ pokemon: pokemon });

    this.$el.append(content);
  },

  refreshPokemon: function (options) {
    this.collection.fetch({
      success: function(){
        if (options.success) {
          options.success();
        }
        this.render()
      }.bind(this)
    });
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));
  },

  selectPokemonFromList: function (event) {
    var id = $(event.currentTarget).data("id");
    Backbone.history.navigate("pokemon/" + id, { trigger: true });
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click .toys li": "selectToyFromList"
  },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: function () {
        if (options.success) {
          options.success();
        }
        this.render();
      }.bind(this)
    });
  },

  render: function () {
    $('.toy-detail').empty();
    var content = JST["pokemonDetail"]({ pokemon: this.model });
    this.$el.append(content);

    this.model.toys().each(function (toy) {
      var toyItem = JST["toyListItem"]({ toy: toy })
      this.$el.find('.toys').append(toyItem);
    }.bind(this));


  },

  selectToyFromList: function (event) {
    var id = $(event.currentTarget).data('id');
    var pokemonId = $(event.currentTarget).data('pokemon-id');
    Backbone.history.navigate(
      "pokemon/" + pokemonId +'/toys/' + id,
      { trigger: true }
    );
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var content = JST["toyDetail"]({toy: this.model, pokemon: _([])});
    this.$el.html(content);
  }
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });
