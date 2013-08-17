var validator = (function () {

    var types = [],
        messages,
        config,
        validate,
        hasErrors,
        getMessages,
        configure,
        addStrategies;

    configure = function (configuration) {
        config = configuration;
    };

    addStrategies = function (strategies) {
        types = strategies;
    };

    validate = function (dataFromForm) {
        var data,
            msg,
            type,
            checker,
            resultOk;

        messages = [];

        for (data in dataFromForm) {

            if (dataFromForm.hasOwnProperty(data)) {

                type = config[data];
                checker = types[type];

                if (!type) {
                    continue;
                }

                if (!checker) {
                    throw{
                        name: "ValidationError",
                        messages: "No handler to validate type " + type
                    };
                }

                resultOk = checker.validate(dataFromForm[data]);

                if (!resultOk) {
                    msg = "Invalid value for " + data + ", " + checker.instructions;
                    messages.push(msg);
                }

            }
        }

    };

    hasErrors = function () {
        return messages.length !== 0;
    };

    getMessages = function () {
        return messages;
    };

    return {
        configure: configure,
        validate: validate,
        hasErrors: hasErrors,
        getMessages: getMessages,
        addStrategies: addStrategies
    }

})();

//data to validate
var dataFromForm = {
    movie_name: "Back to the future",
    year: 1985,
    director: "Robert Zemeckis",
    top_250: true
};

//This is configuration object.
//In this example director is not required
var config = {
    movie_name: "isNotEmpty",
    year: "isNumber",
    top_250: "isBoolean"
};

//These are validation strategies
var strategies = {
    isNotEmpty: {
        validate: function (value) {
            return value !== "";
        },
        instructions: "the value cannot be empty"
    },
    isNumber: {
        validate: function (value) {
            return !isNaN(value);
        },
        instructions: "the value can be a number"
    },
    isBoolean: {
        validate: function (value) {
            return typeof value === 'boolean';
        },
        instructions: "the value can be a boolean"
    }
};


validator.configure(config);
validator.addStrategies(strategies);

try {
    //execute validation
    validator.validate(dataFromForm);
    if (validator.hasErrors()) {
        console.log(validator.getMessages());
    } else {
        console.log("validation ok!");
    }
} catch (e) {
    console.log(e.name + ": " + e.message)
}







