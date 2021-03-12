<template>
  <div>
    <b-message class="mb-0" :class="isMobile ? 'is-mobile' : ''" type="is-info">
      <div
        class="is-flex is-flex-direction-row is-justify-content-space-evenly is-align-items-center"
        :class="isMobile ? 'is-thirdquarterwidth' : ''"
      >
        <b-button
          :size="isMobile ? 'is-small' : ''"
          type="is-info"
          focused
          class="control mx-2"
          tag="a"
          href="mailto:spatialframes@gmail.com?cc=someoneelse@theirsite.com, another@thatsite.com, me@mysite.com&bcc=lastperson@theirsite.com&subject=Message%20Title&body=Name:%20%0D%0ASurname:%20%0D%0ACompany:%20%0D%0ACountry:%20%0D%0AMessage:"
          target="_blank"
          icon-left="envelope"
        >
        </b-button>
        <p class="is-size-7 pl-2 has-text-weight-semibold is-pulled-left">
          Feel free to contact us at anytime, we would love to help you optimize
          your best solutions,
        </p>
      </div>
    </b-message>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: ["isMobile"]
};
</script>

<style lang="scss">
.is-thirdquarterwidth {
  width: 70%;
}
.message-body {
  padding-top: 0.8em;
  padding-right: 1em;
  padding-bottom: 0.8em;
  padding-left: 1em;
}
.message-body {
  padding-top: 0.8em;
  padding-right: 1em;
  padding-bottom: 0.8em;
  padding-left: 1em;
}
.message.is-info {
  background-color: #fffbf53b;
}
.is-mobile {
  width: 100vw;
  background-color: #c97d0c17 !important;
}
</style>
