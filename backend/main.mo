import Func "mo:base/Func";

import Float "mo:base/Float";
import Error "mo:base/Error";

actor Calculator {
    // Function to add two numbers
    public func add(x : Float, y : Float) : async Float {
        x + y
    };

    // Function to subtract two numbers
    public func subtract(x : Float, y : Float) : async Float {
        x - y
    };

    // Function to multiply two numbers
    public func multiply(x : Float, y : Float) : async Float {
        x * y
    };

    // Function to divide two numbers
    public func divide(x : Float, y : Float) : async Float {
        if (y == 0) {
            throw Error.reject("Division by zero");
        };
        x / y
    };
}
