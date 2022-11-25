declare namespace Java {
  interface Property {
    id?: number
    name: string
    description?: string
    type: Type
  }

  interface Method {
    id?: number
    name: string
    description?: string
    type?: Type
    parameters?: Type[]
  }

  interface Class {
    id?: number
    name: string
    description?: string
    properties: Property[]
    methods: Method[]
  }

  type Primitive = 'char' | 'int' | 'double' | 'boolean'
    | 'string' | 'float' | 'long' | 'byte' | 'short'

  interface Type {
    id?: number | '@primitive'
    name: Primitive | Class | string | null
  }
}

interface ExamQuestion {
  title: string
  description: string
  classes: Java.Class[]
  input?: string
  output?: string
  samples?: {
    input?: string
    output?: string
  }[]
}