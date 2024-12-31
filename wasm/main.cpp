#include <stdio.h>
#include <iostream>
#include <time.h>
#include <emscripten/emscripten.h>

extern "C" {
  EMSCRIPTEN_KEEPALIVE
	int add(int a, int b) {
	  return a + b;
  }
}
