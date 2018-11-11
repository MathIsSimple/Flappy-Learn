class NeuralNetwork {
  constructor(in_nodes, hid_nodes, out_nodes) {
    this.input_nodes  = in_nodes;
    this.hidden_nodes = hid_nodes;
    this.output_nodes = out_nodes;

    this.hidden_layer = new Layer(in_nodes,  hid_nodes);
    this.output_layer = new Layer(hid_nodes, out_nodes);
  }

  predict(inputs) {
    let outputs = [];

    let hidden_outputs = new Array(this.hidden_nodes);

    for (let i = 0; i < this.hidden_nodes; i ++) {
      hidden_outputs[i] = this.hidden_layer.calc(i, inputs);
    }

    for (let i = 0; i < this.output_nodes; i ++) {
      outputs[i] = this.output_layer.calc(i, hidden_outputs);
    }

    return outputs;
  }

  copy() {
    let new_nn = new NeuralNetwork(this.input_nodes, this.hidden_nodes, this.output_nodes);
    new_nn.hidden_layer.weights = this.hidden_layer.weights.slice();
    new_nn.output_layer.weights = this.output_layer.weights.slice();
    new_nn.hidden_layer.biases = this.hidden_layer.biases.slice();
    new_nn.output_layer.biases = this.output_layer.biases.slice();
    return new_nn;
  }

  doMutate(x) {
    if (x > Math.random()) return true;
    return false;
  }

  mutate(x) {
    for (let i = 0; i < this.hidden_layer.weights.length; i ++) {if (this.doMutate(x)) {this.hidden_layer.weights[i] = newWorB();}}
    for (let i = 0; i < this.hidden_layer.biases.length;  i ++) {if (this.doMutate(x)) {this.hidden_layer.biases[i]  = newWorB();}}
    for (let i = 0; i < this.output_layer.weights.length; i ++) {if (this.doMutate(x)) {this.output_layer.weights[i] = newWorB();}}
    for (let i = 0; i < this.output_layer.biases.length;  i ++) {if (this.doMutate(x)) {this.output_layer.biases[i]  = newWorB();}}
  }
}

class Layer {
  constructor(prev_nodes, nodes) {
    this.weights = new Array(nodes);
    this.biases  = new Array(nodes);

    for (let i = 0; i < prev_nodes; i ++) {
      this.weights[i] = new Array(prev_nodes);
      for (let j = 0; j < this.weights[i].length; j ++) {
        this.weights[i][j] = newWorB();
      }
    }

    for (let i = 0; i < this.biases.length; i ++) {
     this.biases[i] = newWorB();
    }
  }

  calc(node, inputs) {
    let output = null;

    for (let i = 0; i < this.weights.length; i ++) {
      output += inputs[i] * this.weights[node][i];
    }

    output += this.biases[node];
    output = sigmoid(output);

    return output;
  }
}

function newWorB() {
  let a = Math.random();
  if (Math.random() > 0.5) a = -a;
  return a;
}

function sigmoid(x) {
  return (1 / (1 + Math.pow(Math.E, -x)));
}