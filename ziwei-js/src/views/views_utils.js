function checkMobileDevice() {
  return (/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i).test(navigator.userAgent);
};

function setupDropdownValues() {
  // Birth dates: 1 - 30
  var dates = Array.fromRange(1, 30).map((day) =>
    '<option value="' + day + '">' + day + '</value>'
  ).join("\n");
  $('#birthDay').append(dates);

  // Birth hour & birth year branch: Ty - Suu - Dan - Mao - Thin - Ty - Ngo - Mui - Than - Dau - Tuat - Hoi
  var branchNames = Ziwei.Configs.Branches.Names;
  var branches = branchNames.mapKeyValues((branch, name) =>
    '<option value="' + branch + '">' + name + '</value>'
  ).join("\n");
  $('#birthHour').append(branches);
  $('#birthYearBranch').append(branches);

  // Birth month: Dan - Mao - Thin - Ty - Ngo - Mui - Than - Dau - Tuat - Hoi - Ty - Suu
  var lunarMonths = branchNames.allKeys().map((branch, index) =>
    '<option value="' + branch + '">' + branchNames[branch] + ' (' + (index+1).limitInc(-2) + ')</value>'
  );

  var lunarMonths = $.merge(lunarMonths.slice(2, lunarMonths.length), lunarMonths.slice(0, 2)).join("\n");
  $('#birthMonth').append(lunarMonths);

  // Birth year stem: Giap - At - Binh - Dinh - Mau - Ky - Canh - Tan - Nham - Quy
  var stems = Ziwei.Configs.Stems.Names.mapKeyValues((stem, name) =>
    '<option value="' + stem + '">' + name + '</value>'
  ).join("\n");
  $('#birthYearStem').append(stems);
};

function setupCalcButtonHandler(calculator) {
  $('#calcButton').click(() => {
    var name = $('#profileName').val() || '<N/A>';
    var gender = $('#gender').val();
    var birthHour = $('#birthHour').val();
    var birthDay = parseInt($('#birthDay').val());
    var birthMonth = $('#birthMonth').val();
    var birthYearStem = $('#birthYearStem').val();
    var birthYearBranch = $('#birthYearBranch').val();
    var key = [gender, birthHour, birthDay, birthMonth, birthYearStem, birthYearBranch].join("_")
    
    var resultTable = calculator.calculateUserInputProfile({
      'key': key,
      'name': name,
      'gender': gender,
      'birthHour': birthHour,
      'birthDay': birthDay,
      'birthMonth': birthMonth,
      'birthYear': {
        'stem': birthYearStem,
        'branch': birthYearBranch
      }
    });
    console.log(gender);
    console.log(resultTable);

    Ziwei.Calculator.renderHtml(resultTable, $('#full-mode-button').hasClass('active'));
  });
};

function setupTestButtonHandler(calculator) {
  var profileOptions = calculator.profiles.mapKeyValues((key, profile) =>
    '<option value="' + key + '">' + profile.name + '</value>'
  ).join("\n");
  $('#presetProfile').append(profileOptions);

  $('#testButton').click(() => {
    var profileKey = $("#presetProfile").val();
    var resultTable = calculator.calculatePresetProfile(profileKey);
    Ziwei.Calculator.renderHtml(resultTable, $('#full-mode-button').hasClass('active'));
  });
};

function setupCheckersHandler(calculator) {
  var testModeButton = $('#test-mode-button');

  testModeButton.click(function() {
    testModeButton.toggleClass('active');
    var activeState = testModeButton.hasClass('active');
    testModeButton.text(activeState ? 'Nhập sẵn' : 'Nhập tay');
    $('#main-controls')[0].hidden = activeState;
    $('#test-controls')[0].hidden = !activeState;
  });

  var fullModeButton = $('#full-mode-button');

  if (checkMobileDevice()) {
    fullModeButton.removeClass('active');
    fullModeButton.text('Tên tắt');
  }

  fullModeButton.click(function() {
    if (calculator.currentProfile === undefined) {
      alert('Chưa lập số!');
      return;
    }

    fullModeButton.toggleClass('active');
    var activeState = fullModeButton.hasClass('active');
    fullModeButton.text(activeState ? 'Tên đủ' : 'Tên tắt');
    var resultTable = calculator.calculateCurrentProfile();
    Ziwei.Calculator.renderHtml(resultTable, activeState);
  });
};