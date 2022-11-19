---
layout:     post
title:      IPv6 - Android手机息屏丢失IPv6网关问题的分析
subtitle:   Analysis of the problem that IPv6 gateway disappear after screen off on Android phone.
date:       2022-11-19
author:     Xymmh Wang
header-img: img/titlephoto6.jpg
catalog: True
tags:
    - IPv6
    - Openwrt
    - Android
    - 技术闲谈
    - 弱电工程
---

## 现象

当路由器正确配置IPv6时，安卓手机在息屏一段时间后，IPv6网关会丢失（但IPv6地址仍存在），导致IPv6连接丢失，且无法自动恢复。

使用WIFI魔盒观测IPv6默认网关存在状态可以可视化监视到此问题。

*Openwrt系统路由器的默认RA Lifetime为1800s，RA max interval为600s，RA min interval为200s，实际的RA interval是介于max interval与min interval之间的随机数。

<br>
## 分析

我发现这个现象后，我一直认为是Openwrt和安卓之间有什么兼容性问题，或者是我的配置问题，曾多次在Telegram上求助Openwrt编译大群人员，无果。

直到看到了这个错误报告：

https://issuetracker.google.com/issues/241959699

其中提到：

> On a Pixel 6 Pro running Android 12 and on a wifi network, IPv6 RAs (router advertisements) are not received when the screen is off.  This result is that the > device loses IPv6 connectivity after the RA Lifetime has passed, even if it is a reasonable value such as 1800 seconds.

意思就是当Pixel 6的屏幕息屏时，路由器定时发出的RA（路由通告）信息将不会被接收，

而RA的功能其中之一就是宣告默认网关，

因此，在RA Lifetime（生存周期，一般路由器默认为1800秒）过去后，因手机未在RA Lifetime内接收RA通告，所以会丢失IPv6网关及IPv6连接。

作者使用了抓包的方式证明了这一情况确实存在：
<br>
>Test setup is to have a laptop on the same wifi network as the phone and to watch when multicast RAs show up on the laptop with:
>$ tcpdump -i br0 -n -vvv "icmp6 && ip6[40] == 134"
>(This confirms that RAs are multicast out every few minutes, and at most once every 600 seconds, as expected.)
>
>With:
>$ adb shell dumpsys network_stack | grep "icmp6 ra"
>and
>$ adb shell grep Icmp6InRouterAdvertisements /proc/net/snmp6
>
>you can see when RAs show up (they are logged in the former and increment a counter in the latter).
>When the screen is on, multicast RAs are received just like on other devices on the wifi network.
>When the screen is off, multicast RAs are NOT received (the counter doesn't seem to increment).
>
>The only thing I can see in the WifiHAL log for the DTIM multiplier has it set to 2, so at least half should be making it through:
>
>08-10 10:31:07.438   809   809 D WifiHAL : Setting DTIM config , halHandle = 0xb400007c1655ea90 Multiplier = 2
>08-10 10:31:07.438   809   809 I WifiHAL : Successfully configured dtim multiplier 2
>
>It does appear that Neighbor Advertisements are being received when the screen is off, not just RAs.
>
>Eventually (when the RA Lifetime is reached while the screen is off), the phone will lose IPv6 connectivity.  This shows up in the network_stack log as:
>
>    2022-08-10T08:58:27.785706 - Disabled accept_ra parameter
>
>and onLinkPropertiesChange and elsewhere also show IPv6 connectivity disappearing.
>
>
>(Oddly, unicast ICMPv6 echo replies/responses do reach the phone even when when dozing, so at least receiving 

这个问题违背了安卓的兼容性原则：

>Android 12 Compatibility rule 7.4.5.2 rule [C-0-4] and [C-0-5].  Per:  https://source.android.com/compatibility/12/android-12-cdd#7452_ipv6
>"[C-0-3] MUST enable IPv6 by default.
>    MUST ensure that IPv6 communication is as reliable as IPv4, for example:
>        [C-0-4] MUST maintain IPv6 connectivity in doze mode.
>        [C-0-5] Rate-limiting MUST NOT cause the device to lose IPv6 connectivity on any IPv6-compliant network that uses RA lifetimes of at least 180 >seconds."

[C-0-3] 必须默认启用 IPv6。

必须确保 IPv6 通信与 IPv4 一样可靠，例如：

[C-0-4]必须在低电耗模式下保持 IPv6 连接。

[C-0-5]速率限制不得导致设备在使用至少 180 秒的 RA 生存期的任何符合 IPv6 的网络上丢失 IPv6 连接。

<br>
## 结论

因此可以基本确定，这个问题是安卓系统的一个BUG，并不是路由器的odhcpd软件的配置问题。

且根据网友反馈，这个问题在安卓13上仍然存在。

一位安卓工程师回复：

>We have shared this with our product and engineering team and will update this issue with more information as it becomes available.

说明他们已在着手解决这个问题。

<br>
## 总结

很多人在实际使用中没有发现这个问题的原因，是因为IPv4的连接性不会因为息屏而受到影响，设备在尝试连接IPv6失败失败后会Fallback回IPv4，而目前又没有什么应用只有IPv6可用。

对于用户来说，Fallback的结果就是在浏览中，具有IPv4/IPv6双栈资源的图片无法在第一时间加载，这也就给用户造成了一个“我的网络不好“或”开启IPv6后我的网络变差了”的假象。

很少有用户真正关注他们的设备是否一直处于IPv6可用状态，因此这种假象也给IPv6的推行带来了一定阻力。

希望这个问题能尽早被解决。


