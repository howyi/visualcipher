import React, { useEffect, useState } from 'react'
import { NodeProps } from 'reactflow'
import { Input } from '@/components/ui/input'
import {
  Module,
  ModuleProcessProps,
  Ports,
} from '@/components/flow/modules/types'
import { ModuleNode } from '@/components/flow/components/module-node'
import { useNodeData } from '@/components/flow/hooks/use-node-data'
import { Checkbox } from '@/components/ui/checkbox'
import { StringShift } from '@/components/flow/utils/string-shift'
import { ALPHABETS, UNKNOWN_CHARACTER } from '@/components/flow/utils/const'
import { Highlight } from '@/components/flow/components/highlight'
import { useNodeState } from '@/components/flow/hooks/use-node-state'

type Data = {
  key?: string
  decryptMode?: boolean
}

const SKIP_SPACE = true
const SKIP_BREAK = true

const ports = {
  in: {
    input: {},
  },
  out: {
    output: {},
  },
} as const satisfies Ports<Data>

type VSquareKey = string
type VSquarePlainText = string
type VSquareCipherText = string

type VSquare = {
  [key in VSquareKey]: {
    [text in VSquarePlainText]: VSquareCipherText
  }
}

const VigenereSquare = (): VSquare => {
  const vs: VSquare = {}
  for (const key of ALPHABETS.split('')) {
    vs[key] = {}
    const keyIndex = ALPHABETS.indexOf(key)
    for (const plainText of ALPHABETS.split('')) {
      const encrypts = StringShift(ALPHABETS, -keyIndex)
      const plainTextIndex = ALPHABETS.indexOf(plainText)
      vs[key][plainText] = encrypts.slice(plainTextIndex, plainTextIndex + 1)
    }
  }
  return vs
}

type Result = {
  encrypted: string
  lastKeyCharacter: string
  lastTextCharacter: string
  lastEncryptedCharacter: string
  lastKeyIndex?: number
}

export const VigenereModule: Module<Data, typeof ports, Result> = {
  type: 'vigenere',
  node: node,
  calculate,
  defaultData: {
    key: 'LEMON',
    decryptMode: false,
  },
  name: 'Vigenere Cipher',
  description: `The Vigenere cipher encrypts text using keywords in the form of a combination of multiple Caesar ciphers. The user can enter any text and keywords and get an encrypted message based on the combination. Because this cipher does not rely on a single shift quantity, it is more difficult to decipher than a simple substitution cipher.`,
  ports: {
    in: {
      input: {},
    },
    out: {
      output: {},
    },
  },
}

function calculate({
  node,
  inputs,
  setResult,
}: ModuleProcessProps<Data, typeof ports, Result>) {
  const result = VigenereEncrypt(
    inputs.input ?? '',
    node.data.key ?? '',
    node.data.decryptMode ?? false
  )
  setResult(result)
  return result.encrypted
}

function VigenereEncrypt(
  text: string,
  key: string,
  decryptMode: Required<Data>['decryptMode']
): Result {
  if (!text || !key) {
    return {
      encrypted: text,
      lastKeyCharacter: '',
      lastTextCharacter: '',
      lastEncryptedCharacter: '',
    }
  }
  let keyIndex = undefined
  let encryptedCharacters = ''
  let encrypted = ''
  let keyCharacter = ''
  let lastTextCharacter = ''
  let encryptedCharacter = ''
  const square = VigenereSquare()
  for (const textCharacter of text.split('')) {
    if (SKIP_SPACE && textCharacter === ' ') {
      encrypted += ' '
      continue
    }
    if (SKIP_BREAK && textCharacter === '\n') {
      encrypted += '\n'
      continue
    }
    keyIndex = encryptedCharacters.length % key.length
    keyCharacter = key.split('')[keyIndex]
    if (!square[keyCharacter]) {
      encryptedCharacter = ''
      lastTextCharacter = ''
      encryptedCharacters += UNKNOWN_CHARACTER
      encrypted += UNKNOWN_CHARACTER
      continue
    }
    if (decryptMode) {
      let found = false
      for (let squareElementKey in square[keyCharacter]) {
        if (square?.[keyCharacter][squareElementKey] == textCharacter) {
          found = true
          encryptedCharacter = textCharacter
          lastTextCharacter = squareElementKey
          encryptedCharacters += squareElementKey
          encrypted += squareElementKey
        }
      }
      if (!found) {
        encryptedCharacter = ''
        lastTextCharacter = ''
        encryptedCharacters += UNKNOWN_CHARACTER
        encrypted += UNKNOWN_CHARACTER
      }
    } else {
      if (square[keyCharacter][textCharacter]) {
        lastTextCharacter = textCharacter
        encryptedCharacter = square[keyCharacter][textCharacter]
        encryptedCharacters += encryptedCharacter
        encrypted += encryptedCharacter
      } else {
        encryptedCharacter = ''
        lastTextCharacter = ''
        encryptedCharacters += UNKNOWN_CHARACTER
        encrypted += UNKNOWN_CHARACTER
      }
    }
  }
  return {
    encrypted: encrypted,
    lastKeyCharacter: keyCharacter,
    lastKeyIndex: keyIndex,
    lastTextCharacter,
    lastEncryptedCharacter: encryptedCharacter,
  }
}

function node({ id, data: initialData }: NodeProps<Data>) {
  const [data, setData] = useNodeData<Data>(id, initialData)
  const { inputs, result } = useNodeState<typeof ports, Result>()
  const [key, setKey] = useState(initialData.key ?? '')
  const [decryptMode, setDecryptMode] = useState(
    initialData.decryptMode ?? false
  )

  useEffect(() => {
    setData({ key, decryptMode })
  }, [key, decryptMode])

  return (
    <ModuleNode module={VigenereModule}>
      <div className={'flex flex-col m-auto gap-2'}>
        <div className={'flex flex-col gap-2'}>
          <div className="flex items-center mx-auto space-x-2">
            <Checkbox
              checked={data.decryptMode}
              id="reverse"
              onCheckedChange={(e) => setDecryptMode(!decryptMode)}
            />
            <label
              htmlFor="reverse"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Decrypt mode
            </label>
          </div>
          <div className={'flex flex-row'}>
            <div
              className={
                'flex-1 text-center text-muted-foreground text-xs m-auto'
              }
            >
              KEY
            </div>
            <Input
              id="text"
              name="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="nodrag font-mono"
            />
          </div>
        </div>
        <div className={'text-center text-muted-foreground'}>
          <Highlight
            text={key}
            index={result?.lastKeyIndex}
            className={'font-bold text-module-hint'}
          />
        </div>
        <div
          className={
            'pt-4 px-4 text-muted-foreground whitespace-pre leading-4 tracking-widest'
          }
        >
          {'  '}
          {ALPHABETS.split('').map((s) => {
            if (s === result?.lastTextCharacter && decryptMode) {
              return (
                <span key={s} className={'text-module-output'}>
                  {s}
                </span>
              )
            }
            if (s === result?.lastTextCharacter) {
              return (
                <span key={s} className={'text-module-input'}>
                  {s}
                </span>
              )
            }
            return <span key={s}>{s}</span>
          })}{' '}
          <br />
          {'  ──────────────────────────'}
          <br />
          {ALPHABETS.split('').map((s, k) => {
            return (
              <div key={k}>
                {s === result?.lastKeyCharacter ? (
                  <span className={'text-module-hint'}>{s}</span>
                ) : (
                  s
                )}
                |
                {StringShift(ALPHABETS, -k)
                  .split('')
                  .map((e) => {
                    if (s === result?.lastKeyCharacter) {
                      if (
                        e === result.lastEncryptedCharacter &&
                        data.decryptMode
                      ) {
                        return (
                          <span key={e} className={'text-module-input'}>
                            {e}
                          </span>
                        )
                      }
                      if (e === result.lastEncryptedCharacter) {
                        return (
                          <span key={e} className={'text-module-output'}>
                            {e}
                          </span>
                        )
                      }
                      return (
                        <span
                          key={e}
                          className={'bg-muted-foreground text-background'}
                        >
                          {e}
                        </span>
                      )
                    }
                    return <span key={e}>{e}</span>
                  })}
                <br />
              </div>
            )
          })}
        </div>
        <div className={'text-muted-foreground mx-auto'}>
          The Vigenère square
        </div>
      </div>
    </ModuleNode>
  )
}
