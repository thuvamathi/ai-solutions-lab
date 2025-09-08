'use client';

import { useChat } from '@ai-sdk/react';
import { Box, Button, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Prose } from '@/components/ui/prose';
import Markdown from 'react-markdown';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  return (
    <Box>
      <Box maxW='600px' mx='auto' px='4' pt='4' pb='20'>
        <Stack gap='4'>
          {messages.map((message) => (
            <Box
              key={message.id}
              alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
              bg={message.role === 'user' ? 'blue.200' : 'gray.200'}
              color='black'
              px='4'
              py='2'
              borderRadius='lg'
              maxW='80%'
              boxShadow='sm'
            >
              {message.parts.map((part, i) =>
                part.type === 'text' ? (
                  <Prose key={`${message.id}-${i}`}>
                    <Markdown>{part.text}</Markdown>
                  </Prose>
                ) : null
              )}
            </Box>
          ))}
        </Stack>
      </Box>

      <Box
        as='form'
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
        position='fixed'
        bottom='0'
        left='0'
        right='0'
        bg='white'
        py='3'
        px='4'
        borderTop='1px solid'
        borderColor='gray.100'
      >
        <Box maxW='600px' mx='auto'>
          <HStack>
            <Input
              placeholder='Say something...'
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              flex='1'
            />
            <Button type='submit'>Send</Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
