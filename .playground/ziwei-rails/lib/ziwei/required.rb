[
  ["json", "erb"],
  Dir["./extensions/*.rb"],
  Dir["./configs/*.rb"],
  Dir["./utils/*.rb"],
  Dir["./models/*.rb"],
  Dir["./*.rb"]
].each {|files| files.each {|file| require file}}

# Also in config/environment.rb
Fixnum.include Ziwei::Extensions::Fixnum