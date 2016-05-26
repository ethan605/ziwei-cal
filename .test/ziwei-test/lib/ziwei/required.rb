[
  Dir["configs/*.rb"],
  Dir["utils/*.rb"],
  Dir["models/*.rb"],
  Dir["*.rb"]
].flatten.each {|file| require file}