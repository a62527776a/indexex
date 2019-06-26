interface RegistryModel {
  [index: string]: Array<Function>
}

class indexexe {
  db: IDBDatabase
  _registry: RegistryModel = {}

  constructor () {

  }

  getListeners (event: string): Array<Function>  {
    let registry = this._registry || (this._registry = {})
    let callbacks = registry[event] || (registry[event] = []);
    return callbacks
  }

  on (event: string, callback: Function): indexexe {
    let callbacks = this.getListeners(event)
    if (typeof callback !== 'function') throw new TypeError('Indexexe.on(): the 2nd argument must be a function.')
    callbacks.push(callback)
    return this
  }

  emit (event: string): indexexe {
    let args = Array.prototype.slice.call(arguments, 1)
    let callbacks = this.getListeners(event)
    let len: number = callbacks.length

    if (len) {
      callbacks = callbacks.slice(0);
      for (var i = 0; i < len; i += 1) {
        if (typeof callbacks[i] === 'function') {
          callbacks[i].apply(this, args)
        }
      }
    }

    return this
  }

  connect (databaseName: string, version?: number) {
    let request: IDBOpenDBRequest = window.indexedDB.open(databaseName, version)
    request.addEventListener('success', () => {
      this.db = request.result
      this.emit('open')
    })
    request.addEventListener('error', () => {
      this.emit('error')
    })
    request.addEventListener('upgradeneeded', () => {
      this.emit('upgradeneeded')
    })
  }

  Schema () {
    
  }
}