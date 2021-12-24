import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import FlatButton from '../FlatButton'
import { Padding } from 'components/StoryDecorators'
import Flex from '../Flex'
import Box from '../Box'

import Decorator from 'utils/storybook'

import Modal from '.'

const ControlledModal = (props) => {
  const [show, setShow] = useState(false)
  return (
    <Flex justifyContent="center">
      <FlatButton primary onClick={() => setShow(!show)}>
        Show Modal
      </FlatButton>
      <Modal show={show} onClose={() => setShow(false)} {...props} />
    </Flex>
  )
}

storiesOf('Modal', module)
  .addDecorator(Decorator)
  .add('align top (responsive)', () => (
    <Padding>
      <ControlledModal align="top" py={4} width={[1, 1, 600]}>
        {(closeModal) => (
          <Box px={2} pb={2}>
            <DummyContent>
              <FlatButton onClick={closeModal} primary>
                Close that bitch
              </FlatButton>
            </DummyContent>
          </Box>
        )}
      </ControlledModal>
      <DummyContent />
    </Padding>
  ))
  .add('align center (responsive)', () => (
    <Padding>
      <ControlledModal align="center" py={4} width={[1, 1, 600]}>
        {(closeModal) => (
          <Box px={2} pb={2}>
            <h1>Simple Guy</h1>
            <FlatButton onClick={closeModal} primary>
              Close that bitch
            </FlatButton>
          </Box>
        )}
      </ControlledModal>
      <DummyContent />
    </Padding>
  ))
  .add('align bottom (responsive)', () => (
    <Padding>
      <ControlledModal align="bottom" py={4} width={[1, 1, 600]}>
        {(closeModal) => (
          <Box px={2} pb={2}>
            <h1>Simple Guy</h1>
            <FlatButton onClick={closeModal} primary>
              Close that bitch
            </FlatButton>
          </Box>
        )}
      </ControlledModal>
      <DummyContent />
    </Padding>
  ))
  .add('no outside click', () => (
    <Padding>
      <ControlledModal
        align="center"
        py={4}
        width={[1, 1, 600]}
        closeOnOutsideClick={false}
      >
        {(closeModal) => (
          <Box px={2} pb={2}>
            <h1>Simple Guy</h1>
            <FlatButton onClick={closeModal} primary>
              Close that bitch
            </FlatButton>
          </Box>
        )}
      </ControlledModal>
      <DummyContent />
    </Padding>
  ))
  .add('no X', () => (
    <Padding>
      <ControlledModal noX align="center" py={4} width={[1, 1, 600]}>
        {(closeModal) => (
          <Box px={2} pb={2}>
            <h1>Simple Guy</h1>
            <FlatButton onClick={closeModal} primary>
              Close that bitch
            </FlatButton>
          </Box>
        )}
      </ControlledModal>
      <DummyContent />
    </Padding>
  ))
  .add('no X + no outside click', () => (
    <Padding>
      <ControlledModal
        noX
        closeOnOutsideClick={false}
        align="center"
        py={4}
        width={[1, 1, 600]}
      >
        {(closeModal) => (
          <Box px={2} pb={2}>
            <h1>Simple Guy</h1>
            <FlatButton onClick={closeModal} primary>
              Close that bitch
            </FlatButton>
          </Box>
        )}
      </ControlledModal>
      <DummyContent />
    </Padding>
  ))
  .add('full screen', () => (
    <Padding>
      <ControlledModal align="fullscreen" p={0} width={1}>
        {(closeModal) => (
          <Box px={2} pb={2}>
            <DummyContent>
              <FlatButton onClick={closeModal} primary>
                Close that bitch
              </FlatButton>
            </DummyContent>
          </Box>
        )}
      </ControlledModal>
      <DummyContent />
    </Padding>
  ))
  .add('full screen + no X + no outside click', () => (
    <Padding>
      <ControlledModal
        noX
        closeOnOutsideClick={false}
        align="fullscreen"
        p={0}
        width={1}
      >
        {(closeModal) => (
          <Box px={2} pb={2}>
            <DummyContent>
              <FlatButton onClick={closeModal} primary>
                Close that bitch
              </FlatButton>
            </DummyContent>
          </Box>
        )}
      </ControlledModal>
      <DummyContent />
    </Padding>
  ))

const DummyContent = ({ children }) => (
  <div>
    <h1>Whammy</h1>

    {children}

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      My money's in that office, right? If she start giving me some bullshit
      about it ain't there, and we got to go someplace else and get it, I'm
      gonna shoot you in the head then and there. Then I'm gonna shoot that
      bitch in the kneecaps, find out where my goddamn money is. She gonna tell
      me too. Hey, look at me when I'm talking to you, motherfucker. You listen:
      we go in there, and that nigga Winston or anybody else is in there, you
      the first motherfucker to get shot. You understand?{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Look, just because I don't be givin' no man a foot massage don't make it
      right for Marsellus to throw Antwone into a glass motherfuckin' house,
      fuckin' up the way the nigger talks. Motherfucker do that shit to me, he
      better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm
      sayin'?{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Do you see any Teletubbies in here? Do you see a slender plastic tag
      clipped to my shirt with my name printed on it? Do you see a little Asian
      child with a blank expression on his face sitting outside on a mechanical
      helicopter that shakes when you put quarters in it? No? Well, that's what
      you see at a toy store. And you must think you're in a toy store, because
      you're here shopping for an infant named Jeb.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Normally, both your asses would be dead as fucking fried chicken, but you
      happen to pull this shit while I'm in a transitional period so I don't
      wanna kill you, I wanna help you. But I can't give you this case, it don't
      belong to me. Besides, I've already been through too much shit this
      morning over this case to hand it over to your dumb ass.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      My money's in that office, right? If she start giving me some bullshit
      about it ain't there, and we got to go someplace else and get it, I'm
      gonna shoot you in the head then and there. Then I'm gonna shoot that
      bitch in the kneecaps, find out where my goddamn money is. She gonna tell
      me too. Hey, look at me when I'm talking to you, motherfucker. You listen:
      we go in there, and that nigga Winston or anybody else is in there, you
      the first motherfucker to get shot. You understand?{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Look, just because I don't be givin' no man a foot massage don't make it
      right for Marsellus to throw Antwone into a glass motherfuckin' house,
      fuckin' up the way the nigger talks. Motherfucker do that shit to me, he
      better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm
      sayin'?{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Do you see any Teletubbies in here? Do you see a slender plastic tag
      clipped to my shirt with my name printed on it? Do you see a little Asian
      child with a blank expression on his face sitting outside on a mechanical
      helicopter that shakes when you put quarters in it? No? Well, that's what
      you see at a toy store. And you must think you're in a toy store, because
      you're here shopping for an infant named Jeb.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Normally, both your asses would be dead as fucking fried chicken, but you
      happen to pull this shit while I'm in a transitional period so I don't
      wanna kill you, I wanna help you. But I can't give you this case, it don't
      belong to me. Besides, I've already been through too much shit this
      morning over this case to hand it over to your dumb ass.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      My money's in that office, right? If she start giving me some bullshit
      about it ain't there, and we got to go someplace else and get it, I'm
      gonna shoot you in the head then and there. Then I'm gonna shoot that
      bitch in the kneecaps, find out where my goddamn money is. She gonna tell
      me too. Hey, look at me when I'm talking to you, motherfucker. You listen:
      we go in there, and that nigga Winston or anybody else is in there, you
      the first motherfucker to get shot. You understand?{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Look, just because I don't be givin' no man a foot massage don't make it
      right for Marsellus to throw Antwone into a glass motherfuckin' house,
      fuckin' up the way the nigger talks. Motherfucker do that shit to me, he
      better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm
      sayin'?{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Do you see any Teletubbies in here? Do you see a slender plastic tag
      clipped to my shirt with my name printed on it? Do you see a little Asian
      child with a blank expression on his face sitting outside on a mechanical
      helicopter that shakes when you put quarters in it? No? Well, that's what
      you see at a toy store. And you must think you're in a toy store, because
      you're here shopping for an infant named Jeb.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>

    <p>
      Normally, both your asses would be dead as fucking fried chicken, but you
      happen to pull this shit while I'm in a transitional period so I don't
      wanna kill you, I wanna help you. But I can't give you this case, it don't
      belong to me. Besides, I've already been through too much shit this
      morning over this case to hand it over to your dumb ass.{' '}
    </p>

    <p>
      Your bones don't break, mine do. That's clear. Your cells react to
      bacteria and viruses differently than mine. You don't get sick, I do.
      That's also clear. But for some reason, you and I react the exact same way
      to water. We swallow it too fast, we choke. We get some in our lungs, we
      drown. However unreal it may seem, we are connected, you and I. We're on
      the same curve, just on opposite ends.{' '}
    </p>
  </div>
)
