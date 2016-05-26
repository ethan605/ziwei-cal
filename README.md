# ziwei-cal
A hand-made **Zi Wei Calculator** created mostly for revising what I've learned from my master.

### 1. Project structures
The project contains 2 separated parts: the plain Ruby source code and playground environment (written in Rails)

The plain Ruby source code using following structure:

```
  - ziwei
  |-- calculator.rb // Our Calculator
  |-- constants.rb // Global constants
  |-- configs
    |-- // Modules for configuration files
  |-- models
    |-- // All models used project
  |-- results
    |-- // All Zi Wei table created in JSON & HTML
  |-- view_templates
    |-- // All erb templates, stylesheets & scripts that need to build html results
  |-- utils
    |-- // Modules for utility functions
```

Playground is a Rails project named `ZiweiPlayground` that is wrapped in `.playground` directory

The Rails project uses `ruby-2.2.4` with `rails 4.2.6`

### 2. Usage
#### 2.1. The plain Ruby source code
It could be used independently from Rails with following initial command in `irb`:

```
load 'required.rb'
```

`required.rb` is a Ruby file that contains several dependencies & source code that is neccessary for running the Calculator

#### 2.2. The playground
Change directory to `.playground/ziwei-playground/` and use `rails console` (without any pre-loading command required), you can now use all functions of the Calculator

The `ziwei` source code is placed under Rails's `lib` directory, with a config inserted to `application.rb` like this:

```
module ZiweiPlayground
  class Application < Rails::Application
    # Other configs
    
    # Load all directories under lib to work with Rails
    config.autoload_paths << Rails.root.join('lib')
  end
end
```

You can play with the whole things under `playground` environment, then run `make.rb` to copy plain Ruby source codes to the main directory:

```
ruby ziwei/make.rb
```

P/s: don't forget to provide proper dependencies requirement in `required.rb`, or your plain Ruby source code couldn't work properly

#### 2.3. The Calculator
Initialize a new instance of the Calculator to start:

```
calc = Ziwei::Calculator.new
```

The calculator is already preset with several profiles

To calculate Zi Wei table for a specific profile, use `calc_profile(profile_key)` method:

```
calc.calculate_profile("nam_1")
```

To calculate Zi Wei table for all profiles, use `calc_all_profiles` method:

```
calc.calc_all_profiles
```

#### 2.4. Results
Each time `calc_profile(profile_key)` or `calc_all_profiles` method is called, a static Zi Wei table is created in `json` and `html` format, placed under `results/` directory

An `index.html` is created each time too. Open it to get all profiles as a list.

### 3. License
This project use MIT license, please feel free to contribute or ask anything.