import Node from '@inshel/node'

export class ISNode extends Node {
  static instances = []
  static disconnectAll = () => {
    const instances = ISNode.instances
    ISNode.instances = []
    
    return Promise.all(instances.map(async (node) => node.disconnect()))
  }

  constructor (options) {
    super(options)

    ISNode.instances.push(this)
  }
}

class Environment {
  constructor (options) {
    this.ISNode = ISNode

    Object.keys(options || {}).forEach((key) => { this[key] = options[key] })
  }
}

export default Environment