import React from 'react'
import { styled } from '@stitches/react'
import { motion } from 'framer-motion'
import { RiArrowDownSFill } from 'react-icons/ri'

import { Controls } from '@/components/Controls'
import CodeBlock from '@/elements/CodeBlock'
import usePlayer from '@/lib/usePlayer'

import { BlockList } from '../Block'
import { Memory, MemoryBlock } from '../MemoryWorkflow'

type AnimationState = {
  cursor: number | null
  lineNumber?: number
  memory: Memory
}

const steps: AnimationState[] = [
  {
    cursor: null,
    memory: new Memory(),
  },
  {
    cursor: null,
    lineNumber: 1,
    memory: new Memory().allocate(4),
  },
  {
    cursor: 0,
    lineNumber: 4,
    memory: new Memory().allocate(4).set(0, 'a'),
  },
  {
    cursor: 1,
    lineNumber: 5,
    memory: new Memory().allocate(4).set(0, 'a').set(1, 'b'),
  },
  {
    cursor: 0,
    lineNumber: 6,
    memory: new Memory().allocate(4).set(0, 'a').set(1, 'b'),
  },
  {
    cursor: null,
    lineNumber: 9,
    memory: new Memory(),
  },
  {
    cursor: null,
    memory: new Memory(),
  },
]

export function ArrayResize() {
  const player = usePlayer(steps, { delay: 1200 })
  const { memory, cursor } = player.models.state

  return (
    <Wrapper>
      <AnimationWrapper>
        <BlockList>
          {memory.map((block, index) => (
            <MemoryBlock key={index} state={block.state} index={index}>
              {block.data}
            </MemoryBlock>
          ))}
          {cursor !== null && (
            <Pointer
              initial={{ opacity: 0 }}
              animate={{
                x: `calc(${cursor} * calc(8px + 4rem))`,
                opacity: 1,
              }}
            >
              <RiArrowDownSFill size="2em" />
            </Pointer>
          )}
        </BlockList>
      </AnimationWrapper>
      <Controls player={player} />
    </Wrapper>
  )
}

const Pointer = styled(motion.div, {
  position: 'absolute',
  color: '$black',
  width: '4rem',
  display: 'flex',
  justifyContent: 'center',
  top: 'calc(-2em - 2px)',
  left: 0,
})

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const AnimationWrapper = styled('div', {
  background: '$grey200',
  padding: '$20 $16',
  borderRadius: '12px',
  marginBottom: '$4',
})

const CodeWrapper = styled(CodeBlock, {
  position: 'relative',
  width: 'fit-content',
  transform: 'translateY(16px)',
})