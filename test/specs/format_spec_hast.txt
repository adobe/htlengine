#
### String format
#
${'Asset {0}' @ format=properties.assetName}
${'Asset {0}' @ format=[properties.assetName]}
${'Asset {0} out of {1}' @ format=[properties.current, properties.total]}
${properties.formatter @ format=[properties.current, properties.total]}
${properties.date @ format=properties.dateMilliseconds}
${'yyyy-MM-dd HH:mm:ss.SSSXXX' @ format=properties.dateMilliseconds, timezone='UTC'}
${'yyyy-MM-dd HH:mm:ss.SSSXXX' @ format=properties.dateMilliseconds, timezone='GMT+02:00'}
${'yyyy-MM-dd HH:mm:ss.SSS(z)' @ format=properties.dateMilliseconds, timezone='GMT+02:00'}
${'yyyy-MM-dd HH:mm:ss.SSSZ' @ format=properties.dateMilliseconds, timezone='GMT+02:00'}
${'EEEE, d MMM y' @ format=properties.dateMilliseconds, timezone='UTC', locale='de'}
${'EEEE, d MMM y' @ format=properties.dateMilliseconds, timezone='UTC', locale='en_US'}
${'$#,###.00' @ format=1000, locale='chs'}
${'$#,###.00' @ format=1000}
${'#,###.00' @ format=1000}
===
Asset Night Sky
Asset Night Sky
Asset 3 out of 5
Asset 3 out of 5
2019
2019-02-15 17:39:05.916+00:00
2019-02-15 19:39:05.916+02:00
2019-02-15 19:39:05.916(UTC)
2019-02-15 19:39:05.916+0200
Freitag, 15 Feb. 2019
Friday, 15 Feb 2019
¥1,000.00
$1,000.00
1,000.00
#
### todo: number formats
#
### todo: date formats
#
