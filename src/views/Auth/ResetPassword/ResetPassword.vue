<template>
  <div class="reset-password-page">
    <v-layout align-center justify-center align="start">
      <!--        there is css to grow force flex, need to fix-->
      <v-flex lg9 md10 sm11 xs11 class="flex-grow-0">
        <v-card class="page__main text-xs-left">
          <v-card-title class="page__title px-0 pb-0"
            >Reset password
          </v-card-title>
          <v-responsive class="pointer-green-icon" align="start"
            ><svg
              id="Layer_1"
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              enable-background="new 0 0 20 20"
              xml:space="preserve"
            >
              <image
                id="image0"
                width="20"
                height="20"
                x="0"
                y="0"
                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                  AAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABWVBMVEX///9C14JK1odJ1YZI
                  1oZG14JE14VE0IRG1YNA1YFH1YNH1oVH1IRH1ohG1YU/0n9I1IVG0oNC14FL1YdE14JA1IFH1YRG
                  1oRH04RK1YdF14RG1YRG1oZB1oRF1IRE1YM844ND0YJG04NG14RF1IU513tD2YNG14VE04VE1YdB
                  04BF14NI1YdG14VH0oVJ1oZJ1YZE1oNF1oVD04JJ1YdF1YVI1oZJ1oZJ1YZJ1YZJ1YZJ1YdA04FI
                  04VI1YdJ1YZJ1YZF1YRK1YdJ1YZJ1YZJ1YZJ1YZJ1oZI1YZH1oVJ1YZJ1YZJ1YZH1oVH1oRJ1YZJ
                  1YZL1YZI1YZJ1YZJ1YZJ1YZH1YVH1oZJ1YZJ1YZJ1YZI1oZB1oVK1odJ1YZH1YVE2oRA0oNJ1YZJ
                  1IZH1oVG1oZK1YZJ1oZJ1Yc91n5J1YZJ1YZH1YdJ1odG1INE1oVJ1YZK1Yb///948ONXAAAAcHRS
                  TlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQ8dQqXZHRdLrwlJ
                  y+H0/dgFAnXz+X0Wec3v/mkMUuf8+M6s9+LCTGXpxlQFrdFmGAOh9r06AQjVJDX6vj8EAjCm32EK
                  VaOzlQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfjCxsKLDC+s/zX
                  AAAAvklEQVQY02NgGHyAkYmZmYWVjV1bh4OTi5uHl49fQJBBSJiZmUFEV0/fwFBUTFyC18jYxJRB
                  RJKZ2czcwtKqwNpGTNzWzt6h0JFBysnZxaHAytXezcHdw9PLu6DAx5fBr6CgwD8gMCg4pMDewKfA
                  zTU0LJwhosAqMio6hoEhFijrFhefkCgtw5DklpzCwCArJ5+aVuCfnpGpoCjNwJCVrQR2mrJKTm6e
                  CrMqmMPMrKQGotU1NPO1VMBCMrQIDwAJXCM1FF5JRgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0x
                  MS0yN1QxMDo0NDo0OCswMzowMM5/E14AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMTEtMjdUMTA6
                  NDQ6NDgrMDM6MDC/IqviAAAAAElFTkSuQmCC"
              /></svg
          ></v-responsive>
          <v-card-text class="px-0 pt-3">
            <v-form ref="form">
              <v-alert
                color="warning"
                align="left"
                icon="priority_high"
                value="false"
                v-if="errorMessage"
                >Error: Hash is not valid, please checkout latest email for
                password reset
              </v-alert>
              <v-layout row wrap class="form__layout">
                <v-flex lg6 md6 sm6 xs12 class="px-3">
                  <v-text-field
                    class="pt-5"
                    name="password"
                    id="password"
                    label="New Password"
                    :append-icon="visible ? 'visibility_off' : 'visibility'"
                    @click:append="() => (visible = !visible)"
                    :type="visible ? 'text' : 'password'"
                    v-model="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex lg6 md6 sm6 xs12 class="px-3">
                  <v-text-field
                    class="pt-5"
                    name="confirm_password"
                    id="confirmPassword"
                    label="Confirm Password"
                    :append-icon="visible ? 'visibility_off' : 'visibility'"
                    @click:append="() => (visible = !visible)"
                    :type="visible ? 'text' : 'password'"
                    v-model="confirmPassword"
                    :rules="confirmPasswordRules"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions class="px-0">
            <v-btn color="primary" class="btn-control" @click="resetPassword()"
              >Submit</v-btn
            >
          </v-card-actions>
          <div class="app-spinner" v-if="showSpinner">
            <CircleLoader color="#49D586" />
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script src="./ResetPassword.js"></script>

<style scoped lang="scss" src="./ResetPassword.scss"></style>
