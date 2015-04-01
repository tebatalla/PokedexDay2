Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    "submit form": "savePokemon"
  },

  render: function () {
    var content = JST["pokemonForm"];
    this.$el.html(content);
  },

  savePokemon: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()["pokemon"];
    this.model.save(params, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate('pokemon/' + this.model.id, { trigger: true })
      }.bind(this)
    })
  }
});

Pokedex.Views.ToyForm = Backbone.View.extend({
  events: {
    "submit form": "saveToy"
  },

  initialize: function(options) {
    this.pokemon = options.pokemon;
  },

  render: function(){
    var content = JST["toyForm"];
    this.$el.html(content);
  },

  saveToy: function(event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()["toy"];
    params.pokemon_id = this.pokemon.id;
    this.model.save(params, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate(
          'pokemon/' + this.pokemon.id + '/toys/' + this.model.id,
          { trigger: true }
        );
      }.bind(this)
    })
  }
});
