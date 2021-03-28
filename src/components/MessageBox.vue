<template>
  <div>
    <b-message class="mb-0" :class="isMobile ? 'is-mobile' : ''" type="is-info">
      <div
        class="is-flex is-flex-direction-row is-align-items-center"
        :class="isMobile ? 'is-thirdquarterwidth' : ''"
      >
        <b-button
          :size="isMobile ? 'is-small' : ''"
          type="is-info"
          focused
          class="control mx-2"
          tag="a"
          href="mailto:spatial@estructurasarque.com?cc=spatialframes@gmail.com&bcc=albertjimenez7@hotmail.com&subject=Message%20Title&body=Name:%20%0D%0ASurname:%20%0D%0ACompany:%20%0D%0ACountry:%20%0D%0AMessage:"
          target="_blank"
          icon-left="envelope"
        >
        </b-button>
        <p
          class="pl-2 has-text-weight-semibold is-pulled-left"
          :class="isMobile ? 'is-size-8' : 'is-size-7'"
        >
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
.is-size-8 {
  font-size: 0.55rem !important;
}
.is-thirdquarterwidth {
  width: 100%;
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
  padding-bottom: 1.5em;
  padding-left: 1em;
}
.message.is-info {
  background-color: #fffbf53b;
}
.is-mobile {
  width: 100%;
  height: 100%;
  background-color: #c97d0c17 !important;
}
</style>
