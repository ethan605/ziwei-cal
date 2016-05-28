[
  ["json", "erb"],
  Dir["./extensions/*.rb"],
  Dir["./configs/*.rb"],
  Dir["./utils/*.rb"],
  Dir["./models/*.rb"],
  Dir["./*.rb"]
].each {|files| files.each {|file| require file}}