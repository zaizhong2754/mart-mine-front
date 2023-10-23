<template>
  <view class="mart-my-page">
    <scroll-view scroll-y :enhanced="true" :show-scrollbar="false" class="my-scroll-view">
      <view class="my-user-info">
        <view class="user-info-left">
          <view class="user-info-photo"></view>
          <view class="user-info-sign">
            <view class="user-info-nickname">小刚</view>
            <view class="user-info-userId">id: 952710086</view>
          </view>
        </view>
        <view class="user-info-right">
          <uni-icons type="forward" size="24"></uni-icons>
        </view>
      </view>

      <uni-list>
        <uni-list-item
          :show-extra-icon="true"
          showArrow
          link="reLaunch"
          to="pages/index/index"
          :extra-icon="{
            color: '#007aff',
            size: '24',
            type: 'list'
          }"
          title="订单记录"
        />
        <uni-list-item
          :show-extra-icon="true"
          showArrow
          link="reLaunch"
          to="pages/index/index"
          :extra-icon="{
            color: '#007aff',
            size: '24',
            type: 'location-filled'
          }"
          title="收货地址"
        />
        <uni-list-item
          :show-extra-icon="true"
          showArrow
          link="reLaunch"
          to="pages/index/index"
          :extra-icon="{
            color: '#007aff',
            size: '24',
            type: 'phone-filled'
          }"
          :rightText="encryptedPhone"
          title="联系方式"
        />
        <uni-list-item
          :show-extra-icon="true"
          showArrow
          link="reLaunch"
          to="pages/index/index"
          :extra-icon="{
            color: '#007aff',
            size: '24',
            type: 'chat-filled'
          }"
          title="客服"
        />
      </uni-list>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const phoneNumber = ref('13012341234')

const encryptedPhone = computed(
  () => phoneNumber.value.slice(0, 3) + '****' + phoneNumber.value.slice(-4)
)
</script>

<style lang="scss">
page {
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}

.mart-my-page {
  height: 100%;
  padding: 0 24rpx;

  .my-scroll-view {
    height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .my-user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 240rpx;
      // background-color: green;

      .user-info-left {
        display: flex;
        align-items: center;

        .user-info-photo {
          width: 140rpx;
          height: 140rpx;
          margin: 0 24rpx 0 36rpx;
          background-color: #ccc;
          border-radius: 50%;
        }

        .user-info-sign {
          font-weight: 700;

          .user-info-nickname {
            margin-bottom: 28rpx;
            font-size: 32rpx;
          }

          .user-info-userId {
            font-size: 24rpx;
          }
        }
      }
    }
  }
}
</style>
