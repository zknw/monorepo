import 'dart:typed_data';

import 'package:bip32/bip32.dart' as bip32;
import 'package:hex/hex.dart';
import 'package:cli/cli.dart' as cli;

void main(List<String> arguments) {
  final seed = Uint8List.fromList(HEX.decode('0000000000000000000000000000000000000000000000000000000000c0ffee'));
  print(seed.join(', '));
  print(HEX.encode(bip32.BIP32.fromSeed(seed).privateKey!.toList()));
}
