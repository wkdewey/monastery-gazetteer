# README

# Monastery Gazetteer

For this project, I again turned to my academic research in Tibetan Buddhism for inspiration. This app allows you to explore monasteries and Tibetan Buddhist figures, and the relationships between them. A monastery can be associated with many figures, but a Buddhist figure can also be associated with many monasteries. This includes their home monastery, but those they visited briefly in the course of their education, those they founded, and others they may have been connected to. This app allows researchers to see these relationships and input their own data. The many-to many relationship between monasteries and figures can be easily modelled in Rails with an SQL database, while JavaScript provides a frontend for a simple, one page interface in which users can explore monasteries, figures, and the relationships between then, and add new monasteries and figures, and their associations, to the database.

## Installation

1. Fork and clone this repository into your own repository, and also (https://github.com/wkdewey/javascript-portfolio-project-monastery-gazetteer-backend/)
2. Run `bundle install`
3. Run `rake db:migrate`, and optionally create a `seeds.rb` file in the db folder to preload data and then run `rake db:seed`.
4. Run 'rails s' to start the server
5. Open 'index.html' in your

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/wkdewey/javascript-portfolio-project-monastery-gazetteer-frontend. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/javascript-portfolio-project-monastery-gazetteer-frontend/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Religion Researcher project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/wkdewey/javascript-portfolio-project-monastery-gazetteer-frontend/CODE_OF_CONDUCT.md).
