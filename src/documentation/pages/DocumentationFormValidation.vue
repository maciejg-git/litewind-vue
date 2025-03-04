<template>
  <h3>Form Validation</h3>

  <section>
    <h4 id="ValidationUsage">Usage</h4>
    <p>
    <code class="code-text">rules</code> prop allows validation of form components. <code class="code-text">rules</code> is an object where each prop is a name of global validator or user defined function with tested value as argument. User functions should return <code class="code-text">true</code> for valid result or the <code class="code-text">string</code> message if the result is invalid. Global validators include: 
    <ul>
      <li>
        <code class="code-text">
          required
        </code>
      </li>
      <li>
        <code class="code-text">
          alpha
        </code>
      </li>
      <li>
        <code class="code-text">
          numeric
        </code>
      </li>
      <li>
        <code class="code-text">
          alphanumeric
        </code>
      </li>
      <li>
        <code class="code-text">
          minLength
        </code>
      </li>
      <li>
        <code class="code-text">
          maxLength
        </code>
      </li>
      <li>
        <code class="code-text">
          minElements
        </code>
      </li>
      <li>
        <code class="code-text">
          maxElements
        </code>
      </li>
      <li>
        <code class="code-text">
          minValue
        </code>
      </li>
      <li>
        <code class="code-text">
          maxValue
        </code>
      </li>
      <li>
        <code class="code-text">
          email
        </code>
      </li>
      <li>
        <code class="code-text">
          atLeastOneUppercase
        </code>
      </li>
      <li>
        <code class="code-text">
          atLeastOneLowercase
        </code>
      </li>
      <li>
        <code class="code-text">
          atLeastOneDigit
        </code>
      </li>
      <li>
        <code class="code-text">
          atLeastOneSpecial
        </code>
      </li>
      <li>
        <code class="code-text">
          sameAs
        </code>
      </li>
    </ul>
    </p>
    <p>
      Default messages of global validators can be changed by <code class="code-text">setValidationMessage(validator, message)</code> function. If validator has argument (for example <code class="code-text">maxLength</code>) <code class="code-text">%d</code> token can be used in message in place of that argument.
    </p>
    <v-code :code="ExampleValidationSetValidationMessage" language="js"></v-code>
  </section>

  <section>
    <h4 id="ExampleValidationUsername">Example - simple validation</h4>
    <div class="example">
      <example name="ExampleValidationUsername"></example>
    </div>

    <div class="example">
      <example name="ExampleValidationPassword"></example>
    </div>

    <div class="example">
      <example name="ExampleValidationCheckbox"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleValidationModes">Example - validation modes</h4>
    <p><code class="code-text">validation-on</code> and <code class="code-text">validation-mode</code> allows control over when to start validation and how to update state according to validation results:
    <ul class="list-disc list-inside">
      <li class="my-2 mt-10">
        <code class="code-text">validate-on: "blur"</code> - validate after input loses focus (<code class="code-text">default</code>)
      </li>
      <li class="my-2">
        <code class="code-text">validate-on: "immediate"</code> - starts validating immediately after first input
      </li>
      <li class="my-2">
        <code class="code-text">validate-on: "form"</code> - validate after calling <code class="code-text">validate</code> function of form component
      </li>
      <li class="my-2">
        <code class="code-text">validate-mode: "silent"</code> - valid values does not change input state unless it was invalid before (only for validate on blur) (<code class="code-text">default</code>)
      </li>
      <li class="my-2">
        <code class="code-text">validate-mode: "eager"</code> - invalid and valid values always change input state
      </li>
    </ul>
    </p>
    <div class="example">
      <example name="ExampleValidationModes" :show-code="false"></example>
    </div>
  </section>

  <section>
    <h4 id="ExampleValidationForm">Example - form validation</h4>
    <p>
     In order to validate entire form wrap inputs with <code class="code-text">v-form</code> component which exposes two functions: <code class="code-text">validate()</code> and <code class="code-text">reset()</code>. Calling <code class="code-text">validate()</code> function validates every input according to its rules and return <code class="code-text">true</code> if all are valid (<code class="code-text">false</code> if any input is invalid). To reset all inputs within <code class="code-text">v-form</code> use exposed <code class="code-text">reset()</code> function.
    </p>
    <div class="example">
      <example name="ExampleValidationForm"></example>
    </div>
  </section>

  <!-- <section> -->
  <!--   <h4 id="ExampleValidationSingleLineMessage">Example - single line messages</h4> -->
  <!--   <p> -->
  <!--     In order to display single line validation message use <code class="code-text">single-line-message</code> prop. -->
  <!--   </p> -->
  <!--   <div class="example"> -->
  <!--     <example name="ExampleValidationSingleLineMessage"></example> -->
  <!--   </div> -->
  <!-- </section> -->

  <!-- <section> -->
  <!--   <h4 id="ExampleValidationMessageSlot">Example - message slot</h4> -->
  <!--   <p> -->
  <!--     In order to customize validation messages <code class="code-text">message</code> slot can be used. -->
  <!--   </p> -->
  <!--   <div class="example"> -->
  <!--     <example name="ExampleValidationMessageSlot"></example> -->
  <!--   </div> -->
  <!-- </section> -->
</template>

<script setup>
import ExampleValidationSetValidationMessage from "../examples/ExampleValidationSetValidationMessage.js?raw"
</script>

<style scoped>
</style>
