import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { Edge, Node } from 'reactflow'
import { FlowTemplate } from '@/components/templates/flow'

const initialNodes: Node<any>[] = [
  {
    id: '1',
    type: 'input',
    data: {
      value: 'VISUALCIPHER',
      isPlaying: true,
      currentValue: 'VISUALCIPHE',
    },
    position: {
      x: 480,
      y: -225,
    },
    positionAbsolute: {
      x: 480,
      y: -225,
    },
    width: 246,
    height: 174,
    selected: false,
    dragging: false,
  },
  {
    id: '3',
    type: 'caesar',
    data: {
      shift: 3,
    },
    position: {
      x: -120,
      y: -75,
    },
    positionAbsolute: {
      x: -120,
      y: -75,
    },
    width: 255,
    height: 152,
    selected: false,
    dragging: false,
  },
  {
    id: '5',
    type: 'vigenere',
    data: {
      key: 'LEMON',
    },
    position: {
      x: 660,
      y: 0,
    },
    positionAbsolute: {
      x: 660,
      y: 0,
    },
    width: 394,
    height: 684,
    selected: false,
    dragging: false,
  },
  {
    id: '6',
    type: 'output',
    data: {},
    position: {
      x: 855,
      y: 780,
    },
    positionAbsolute: {
      x: 855,
      y: 780,
    },
    width: 117,
    height: 108,
    selected: false,
    dragging: false,
  },
  {
    id: 'b6hwJEc2iyP-hurL-7u5z',
    type: 'output',
    position: {
      x: -180,
      y: 135,
    },
    data: {
      value: '',
    },
    width: 117,
    height: 108,
    positionAbsolute: {
      x: -180,
      y: 135,
    },
    selected: false,
    dragging: false,
  },
  {
    id: 'W9E8A3WM5Gh6Mt0-SbLC2',
    type: 'simple_substitution',
    position: {
      x: 0,
      y: 225,
    },
    data: {
      source: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      target: '--------------------------',
    },
    positionAbsolute: {
      x: 0,
      y: 225,
    },
    width: 276,
    height: 255,
    selected: false,
    dragging: false,
  },
  {
    id: 'HjSZ8qZ9u4RdyXAM5fJWu',
    type: 'output',
    position: {
      x: -120,
      y: 570,
    },
    data: {
      value: '',
    },
    width: 142,
    height: 108,
    positionAbsolute: {
      x: -120,
      y: 570,
    },
    selected: false,
    dragging: false,
  },
  {
    id: 'ugyckChvX5ofPBRY8DyvZ',
    type: 'rail_fence_cipher',
    position: {
      x: 315,
      y: 135,
    },
    data: {
      rails: 3,
      decryptMode: false,
    },
    positionAbsolute: {
      x: 315,
      y: 135,
    },
    width: 223,
    height: 182,
    selected: false,
    dragging: false,
  },
  {
    id: 'a1ba5Lf0a8oRLVqdQWJkj',
    type: 'affine_cipher',
    position: {
      x: 105,
      y: 720,
    },
    data: {
      a: 5,
      b: 8,
      decryptMode: false,
    },
    positionAbsolute: {
      x: 105,
      y: 720,
    },
    width: 710,
    height: 261,
    selected: false,
    dragging: false,
  },
  {
    id: '2_aN_qXlcBNnAkzaEak_h',
    type: 'enigma_entry_wheel',
    position: {
      x: 1185,
      y: -150,
    },
    data: {},
    positionAbsolute: {
      x: 1185,
      y: -150,
    },
    width: 435,
    height: 84,
    selected: false,
    dragging: false,
  },
  {
    id: 'yY9taBgc77ICSWR3ar4W7',
    type: 'enigma_scrambler',
    position: {
      x: 1170,
      y: 30,
    },
    data: {
      wiring: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
      notch: 'Q',
      mapType: 'TOP',
    },
    positionAbsolute: {
      x: 1170,
      y: 30,
    },
    width: 300,
    height: 610,
    selected: false,
    dragging: false,
  },
  {
    id: 'w8Om5ghpzavkNzx7Mq4WL',
    type: 'enigma_scrambler_interface',
    position: {
      x: 1200,
      y: 780,
    },
    data: {
      reverse: false,
    },
    positionAbsolute: {
      x: 1200,
      y: 780,
    },
    width: 376,
    height: 238,
    selected: false,
    dragging: false,
  },
  {
    id: 'qlDneLb-ciVead5x2CItE',
    type: 'output',
    position: {
      x: 330,
      y: 465,
    },
    data: {
      value: '',
    },
    positionAbsolute: {
      x: 330,
      y: 465,
    },
    width: 117,
    height: 108,
    selected: false,
    dragging: false,
  },
  {
    id: 'W4GpvDWR48P8B7Zcm-hHy',
    type: 'output',
    position: {
      x: 315,
      y: 1095,
    },
    data: {
      value: '',
    },
    positionAbsolute: {
      x: 315,
      y: 1095,
    },
    width: 117,
    height: 108,
    selected: false,
    dragging: false,
  },
  {
    id: 'DBD5Ydxb4IKij3ccu5DER',
    type: 'output',
    position: {
      x: 1275,
      y: 1125,
    },
    data: {
      value: '',
    },
    positionAbsolute: {
      x: 1275,
      y: 1125,
    },
    width: 117,
    height: 84,
    selected: false,
    dragging: false,
  },
]

const initialEdges: Edge<any>[] = [
  {
    type: 'step',
    id: 'NM7St6V3bmde-iENY86hq',
    source: '1',
    sourceHandle: 'output',
    target: '3',
    targetHandle: 'input',
  },
  {
    type: 'step',
    id: 'hTzVIJJpW8PL7gATfI7SZ',
    source: '1',
    sourceHandle: 'output',
    target: '5',
    targetHandle: 'input',
  },
  {
    type: 'step',
    id: 'wZbjENR-K896BASIQwER3',
    source: '5',
    sourceHandle: 'output',
    target: '6',
    targetHandle: 'input',
  },
  {
    type: 'step',
    source: '3',
    sourceHandle: 'output',
    target: 'b6hwJEc2iyP-hurL-7u5z',
    targetHandle: 'input',
    id: 'reactflow__edge-3output-b6hwJEc2iyP-hurL-7u5zinput',
  },
  {
    type: 'step',
    source: '1',
    sourceHandle: 'output',
    target: 'W9E8A3WM5Gh6Mt0-SbLC2',
    targetHandle: 'input',
    id: 'reactflow__edge-1output-W9E8A3WM5Gh6Mt0-SbLC2input',
  },
  {
    type: 'step',
    source: 'W9E8A3WM5Gh6Mt0-SbLC2',
    sourceHandle: 'output',
    target: 'HjSZ8qZ9u4RdyXAM5fJWu',
    targetHandle: 'input',
    id: 'reactflow__edge-W9E8A3WM5Gh6Mt0-SbLC2output-HjSZ8qZ9u4RdyXAM5fJWuinput',
  },
  {
    type: 'step',
    source: 'a1ba5Lf0a8oRLVqdQWJkj',
    sourceHandle: 'output',
    target: 'W4GpvDWR48P8B7Zcm-hHy',
    targetHandle: 'input',
    id: 'reactflow__edge-a1ba5Lf0a8oRLVqdQWJkjoutput-W4GpvDWR48P8B7Zcm-hHyinput',
  },
  {
    type: 'step',
    source: '1',
    sourceHandle: 'output',
    target: 'a1ba5Lf0a8oRLVqdQWJkj',
    targetHandle: 'input',
    id: 'reactflow__edge-1output-a1ba5Lf0a8oRLVqdQWJkjinput',
  },
  {
    type: 'step',
    source: '1',
    sourceHandle: 'output',
    target: 'ugyckChvX5ofPBRY8DyvZ',
    targetHandle: 'input',
    id: 'reactflow__edge-1output-ugyckChvX5ofPBRY8DyvZinput',
  },
  {
    type: 'step',
    source: 'ugyckChvX5ofPBRY8DyvZ',
    sourceHandle: 'output',
    target: 'qlDneLb-ciVead5x2CItE',
    targetHandle: 'input',
    id: 'reactflow__edge-ugyckChvX5ofPBRY8DyvZoutput-qlDneLb-ciVead5x2CItEinput',
  },
  {
    type: 'step',
    source: '1',
    sourceHandle: 'output',
    target: '2_aN_qXlcBNnAkzaEak_h',
    targetHandle: 'input',
    id: 'reactflow__edge-1output-2_aN_qXlcBNnAkzaEak_hinput',
  },
  {
    type: 'step',
    source: 'w8Om5ghpzavkNzx7Mq4WL',
    sourceHandle: 'output',
    target: 'DBD5Ydxb4IKij3ccu5DER',
    targetHandle: 'input',
    id: 'reactflow__edge-w8Om5ghpzavkNzx7Mq4WLoutput-DBD5Ydxb4IKij3ccu5DERinput',
  },
  {
    type: 'step',
    source: 'yY9taBgc77ICSWR3ar4W7',
    sourceHandle: 'scrambler',
    target: 'w8Om5ghpzavkNzx7Mq4WL',
    targetHandle: 'scrambler',
    id: 'reactflow__edge-yY9taBgc77ICSWR3ar4W7scrambler-w8Om5ghpzavkNzx7Mq4WLscrambler',
  },
  {
    type: 'step',
    source: '1',
    sourceHandle: 'output',
    target: 'w8Om5ghpzavkNzx7Mq4WL',
    targetHandle: 'input',
    id: 'reactflow__edge-1output-w8Om5ghpzavkNzx7Mq4WLinput',
  },
  {
    type: 'step',
    source: '2_aN_qXlcBNnAkzaEak_h',
    sourceHandle: 'rotate',
    target: 'yY9taBgc77ICSWR3ar4W7',
    targetHandle: 'rotate',
    id: 'reactflow__edge-2_aN_qXlcBNnAkzaEak_hrotate-yY9taBgc77ICSWR3ar4W7rotate',
  },
]

const IndexPage: React.FC<PageProps> = () => {
  return (
    <FlowTemplate
      title={'Playground'}
      nodes={initialNodes}
      edges={initialEdges}
      isPlayground={true}
      documentOpen={undefined}
      documentPath={'top'}
    />
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>VisualCipher</title>
